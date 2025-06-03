"use client";

import { RequireAuth } from "@/components/RequireAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { useCategoryStore, useUserStore, useEmailStore } from "@repo/store";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { BsInbox, BsTag, BsStar, BsFileText, BsTrash, BsArchive } from 'react-icons/bs'; // Example icons

// Dummy data for demonstration
const dummyEmails = [
  {
    id: "1",
    from: "sender1@example.com",
    subject: "Meeting Tomorrow",
    snippet: "Just a quick reminder about our meeting...",
    date: "2023-10-26T10:00:00Z",
    category: "work",
    read: false,
    body: "Hi team, \n\nJust a quick reminder about our meeting tomorrow at 10 AM. Please be prepared to discuss...",
  },
  {
    id: "2",
    from: "newsletter@example.com",
    subject: "Weekly Update",
    snippet: "Here's the latest news from our company...",
    date: "2023-10-25T09:00:00Z",
    category: "promotions",
    read: true,
    body: "Hello,\n\nWelcome to our weekly newsletter! This week's highlights include...",
  },
  {
    id: "3",
    from: "friend@example.com",
    subject: "Catching Up",
    snippet: "Hey, long time no see! How have you been?...",
    date: "2023-10-24T15:30:00Z",
    category: "personal",
    read: false,
    body: "Hey [User Name],\n\nLong time no see! How have you been? We should catch up soon. \n\nBest,\n[Friend's Name]",
  },
  {
    id: "4",
    from: "support@example.com",
    subject: "Your Account Update",
    snippet: "Important information about your account...",
    date: "2023-10-24T10:00:00Z",
    category: "important",
    read: false,
    body: "Dear User,\n\nThis is an important update regarding your account...",
  },
];

// Helper to format date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Placeholder for different views
const InboxView = ({ onSelectEmail, emails }: any) => (
  <div className="flex-1 overflow-y-auto p-4">
    {/* Search and Filter Bar Placeholder */}
    <div className="bg-white shadow-sm p-3 rounded-lg mb-4 flex items-center justify-between">
      <input
        type="text"
        placeholder="Search emails..."
        className="flex-1 mr-4 p-2 border border-gray-300 rounded-md"
      />
      <select className="p-2 border border-gray-300 rounded-md">
        <option value="">All Categories</option>
        {/* Map dummy categories here later */}
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="promotions">Promotions</option>
      </select>
    </div>

    {emails.length === 0 ? (
      <p className="text-center text-gray-500">No emails in this folder.</p>
    ) : (
      emails.map((email: any) => (
        <div
          key={email.id}
          className={`border-b border-gray-200 py-3 px-4 cursor-pointer hover:bg-gray-100 ${email.read ? 'bg-white' : 'bg-blue-50'}`}
          onClick={() => onSelectEmail(email.id)}
        >
          <div className="flex justify-between items-center">
            <p className={`font-semibold ${email.read ? 'text-gray-800' : 'text-gray-900'}`}>{email.from}</p>
            <span className="text-xs text-gray-500">{formatDate(email.date)}</span>
          </div>
          <p className={`text-sm mt-1 ${email.read ? 'text-gray-600' : 'text-gray-700 font-medium'}`}>{email.subject}</p>
          <div className="flex items-center mt-1">
             <span className="text-xs text-gray-500 truncate flex-1 pr-4">{email.snippet}...</span>
             {/* Placeholder icons/labels */}
             {email.category && <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-200 text-blue-800 capitalize">{email.category}</span>}
             <BsStar className="ml-2 text-gray-400" />
          </div>
        </div>
      ))
    )}
  </div>
);

const EmailDetailView = ({ email, onClose }: any) => (
  <div className="fixed inset-y-0 right-0 w-full md:w-2/3 bg-white shadow-lg transform transition-transform ease-in-out duration-300 translate-x-0 z-50 flex flex-col">
    {/* Detail Header */}
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <h2 className="text-xl font-bold">{email.subject}</h2>
      <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
    </div>
    {/* Email Metadata */}
    <div className="p-4 border-b border-gray-200 text-sm text-gray-700">
      <p><span className="font-semibold">From:</span> {email.from}</p>
      <p><span className="font-semibold">To:</span> You</p> {/* Assuming 'To' is always the current user for now */}
      <p><span className="font-semibold">Date:</span> {new Date(email.date).toLocaleString()}</p>
    </div>
    {/* Email Body */}
    <div className="flex-1 overflow-y-auto p-4 whitespace-pre-wrap text-gray-800">
      {email.body}
    </div>
    {/* Quick Actions/Category Change Placeholder */}
    <div className="p-4 border-t border-gray-200 flex justify-end">
      {/* Add buttons for Reply, Reply All, Forward, Change Category here */}
      <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Reply</button>
      <button className="ml-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Forward</button>
    </div>
  </div>
);

export default function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedEmailId = searchParams.get('emailId');

  const handleSelectEmail = (emailId: string) => {
    router.push(`/dashboard?emailId=${emailId}`);
  };

  const handleCloseEmailDetail = () => {
    router.push('/dashboard');
  };

  // Find the selected email from dummy data
  const selectedEmail = dummyEmails.find(email => email.id === selectedEmailId);

  return (
    <RequireAuth>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md p-4 flex flex-col">
          <div className="text-center mb-6">
             {/* User Info Placeholder */}
             <div className="w-12 h-12 rounded-full bg-indigo-200 mx-auto flex items-center justify-center text-indigo-800 font-bold">S</div>
             <p className="mt-2 text-sm font-semibold text-gray-800">Sarthak Italiya</p>
             <p className="text-xs text-gray-500">sarthak.italiya@gmail.com</p>
          </div>
          <Link href="/dashboard?view=compose" className="inline-block w-full bg-indigo-600 text-white text-center py-2 rounded-md hover:bg-indigo-700 transition mb-6">+ Compose</Link>
          
          <nav className="flex-1 space-y-2">
            {/* Navigation Links */}
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

          {/* Bottom Links Placeholder */}
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
          {/* Dynamic Content Area (InboxView, StarredView, etc.) */}
          {/* We'll add logic here later to render different views */}
          {/* For now, just show Inbox with dummy data */} 
          <InboxView emails={dummyEmails} onSelectEmail={handleSelectEmail} />
        </div>

        {/* Email Detail Panel */}
        {selectedEmail && (
           <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleCloseEmailDetail}></div>
        )}
        <div className={`fixed inset-y-0 right-0 w-full md:w-2/3 bg-white shadow-lg transform transition-transform ease-in-out duration-300 ${selectedEmail ? 'translate-x-0' : 'translate-x-full'} z-50 flex flex-col`}>
           {selectedEmail && <EmailDetailView email={selectedEmail} onClose={handleCloseEmailDetail} />}
        </div>
      </div>
    </RequireAuth>
  );
}
