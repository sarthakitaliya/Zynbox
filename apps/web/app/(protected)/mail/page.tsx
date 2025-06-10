"use client";

import { RequireAuth } from "@/components/RequireAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEmailStore } from "@repo/store";
import { useCallback, useEffect } from "react";
import Link from 'next/link';
import { BsInbox, BsTag, BsStar, BsFileText, BsTrash, BsArchive } from 'react-icons/bs';
import MailList from './components/mail-list';
import EmailDetail from './components/email-detail';

export default function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedEmailId = searchParams.get('emailId');
  const { getEmails, getFullEmail, setSelectedEmail, clearSelectedEmail } = useEmailStore();

  // Load emails on mount
  useEffect(() => {
    const view = searchParams.get('view') || 'inbox';
    const filter = view === 'inbox' ? '' : view; // Adjust filter based on view
    getEmails(filter).catch((error) => {
      console.error("Failed to fetch emails:", error);
    });
  }, [getEmails]);

  // Handle email selection
  useEffect(() => {
    if (selectedEmailId) {
      getFullEmail(selectedEmailId);
    } else {
      clearSelectedEmail();
    }
  }, [selectedEmailId, getFullEmail, clearSelectedEmail]);

  const handleSelectEmail = useCallback((emailId: string) => {
    router.push(`/dashboard?emailId=${emailId}`);
  }, [router]);

  const handleCloseEmailDetail = useCallback(() => {
    router.push('/dashboard');
  }, [router]);

  return (
    <RequireAuth>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md p-4 flex flex-col">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-full bg-indigo-200 mx-auto flex items-center justify-center text-indigo-800 font-bold">S</div>
            <p className="mt-2 text-sm font-semibold text-gray-800">Sarthak Italiya</p>
            <p className="text-xs text-gray-500">sarthak.italiya@gmail.com</p>
          </div>
          <Link href="/dashboard?view=compose" className="inline-block w-full bg-indigo-600 text-white text-center py-2 rounded-md hover:bg-indigo-700 transition mb-6">+ Compose</Link>
          
          <nav className="flex-1 space-y-2">
            <Link href="/dashboard?view=inbox" className={`flex items-center p-2 rounded-md ${!searchParams.get('view') || searchParams.get('view') === 'inbox' ? 'bg-gray-200 text-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}>
              <BsInbox className="mr-3" /> Inbox
            </Link>
            <Link href="/dashboard?view=starred" className="flex items-center p-2 rounded-md text-gray-600 hover:bg-gray-100">
              <BsStar className="mr-3" /> Starred
            </Link>
            <Link href="/dashboard?view=categories" className="flex items-center p-2 rounded-md text-gray-600 hover:bg-gray-100">
              <BsTag className="mr-3" /> Categories
            </Link>
            <Link href="/dashboard?view=drafts" className="flex items-center p-2 rounded-md text-gray-600 hover:bg-gray-100">
              <BsFileText className="mr-3" /> Drafts
            </Link>
            <Link href="/dashboard?view=sent" className="flex items-center p-2 rounded-md text-gray-600 hover:bg-gray-100">
              <BsFileText className="mr-3" /> Sent
            </Link>
            <Link href="/dashboard?view=archive" className="flex items-center p-2 rounded-md text-gray-600 hover:bg-gray-100">
              <BsArchive className="mr-3" /> Archive
            </Link>
            <Link href="/dashboard?view=bin" className="flex items-center p-2 rounded-md text-gray-600 hover:bg-gray-100">
              <BsTrash className="mr-3" /> Bin
            </Link>
          </nav>

          <div className="mt-auto space-y-2">
            <Link href="/dashboard?view=billing" className="flex items-center p-2 rounded-md text-gray-600 hover:bg-gray-100">
              Billing
            </Link>
            <Link href="/dashboard?view=settings" className="flex items-center p-2 rounded-md text-gray-600 hover:bg-gray-100">
              Settings
            </Link>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col relative">
          <MailList onSelectEmail={handleSelectEmail} />
        </div>

        {/* Email Detail Panel */}
        {selectedEmailId && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleCloseEmailDetail}></div>
            <EmailDetail onClose={handleCloseEmailDetail} />
          </>
        )}
      </div>
    </RequireAuth>
  );
}
