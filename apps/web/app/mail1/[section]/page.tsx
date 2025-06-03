"use client";

import { RequireAuth } from "@/components/RequireAuth";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useCategoryStore, useUserStore, useEmailStore } from "@repo/store";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { BsInbox, BsTag, BsStar, BsFileText, BsTrash, BsArchive, BsGear, BsCreditCard, BsSearch, BsFilter, BsMoon, BsSun, BsArrowRepeat } from 'react-icons/bs'; // Example icons
import CategoriesView from '../components/CategoriesView'; // Import CategoriesView
import BillingView from '../components/BillingView'; // Import BillingView
import SettingsView from '../components/SettingsView'; // Import SettingsView
import ComposeModal from '../components/ComposeModal'; // Import ComposeModal

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
    starred: true,
    archived: false,
    bin: false,
    draft: false,
    sent: false,
    spam: false,
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
    starred: false,
    archived: true,
    bin: false,
    draft: false,
    sent: false,
    spam: false,
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
    starred: true,
    archived: false,
    bin: false,
    draft: false,
    sent: false,
    spam: false,
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
    starred: false,
    archived: false,
    bin: false,
    draft: false,
    sent: true,
    spam: false,
  },
   {
    id: "5",
    from: "draft@example.com",
    subject: "Draft email",
    snippet: "This is a draft email...",
    date: "2023-10-23T11:00:00Z",
    category: "work",
    read: false,
    body: "This is the body of the draft email.",
    starred: false,
    archived: false,
    bin: false,
    draft: true,
    sent: false,
    spam: false,
  },
   {
    id: "6",
    from: "bin@example.com",
    subject: "Deleted item",
    snippet: "This item is in the bin...",
    date: "2023-10-22T16:00:00Z",
    category: "promotions",
    read: true,
    body: "This email was deleted and is now in the bin.",
    starred: false,
    archived: false,
    bin: true,
    draft: false,
    sent: false,
    spam: false,
  },
    {
    id: "7",
    from: "important@example.com",
    subject: "Action Required: Verify Your Account",
    snippet: "Please verify your account to avoid suspension...",
    date: "2023-10-21T09:30:00Z",
    category: "important",
    read: false,
    body: "Dear User,\n\nWe have detected unusual activity on your account. Please click the link below to verify...",
    starred: false,
    archived: false,
    bin: false,
    draft: false,
    sent: false,
    spam: false,
  },
     {
    id: "8",
    from: "marketing@example.com",
    subject: "Limited Time Offer!",
    snippet: "Don't miss out on our special discount...",
    date: "2023-10-20T14:00:00Z",
    category: "promotions",
    read: true,
    body: "Hello,\n\nGet 50% off your next purchase with code SAVE50. Shop now!",
    starred: false,
    archived: false,
    bin: false,
    draft: false,
    sent: false,
    spam: false,
  },
     {
    id: "9",
    from: "spam@example.com",
    subject: "Win a Free iPhone!",
    snippet: "Click here to claim your prize...",
    date: "2023-10-19T10:00:00Z",
    category: "spam",
    read: false,
    body: "Congratulations! You have been selected to win a free iPhone. Click the link below to claim your prize now!",
    starred: false,
    archived: false,
    bin: false,
    draft: false,
    sent: false,
    spam: true,
  },
       {
    id: "10",
    from: "work@example.com",
    subject: "Project Update",
    snippet: "Here's the latest update on the project...",
    date: "2023-10-18T11:00:00Z",
    category: "work",
    read: true,
    body: "Hi team,\n\nJust wanted to give you a quick update on the project status...",
    starred: false,
    archived: false,
    bin: false,
    draft: false,
    sent: false,
    spam: false,
  },
    // Add more dummy emails here to enable scrolling
  {
    id: "11",
    from: "sender11@example.com",
    subject: "Another Meeting",
    snippet: "Following up on our discussion...",
    date: "2023-10-17T14:00:00Z",
    category: "work",
    read: false,
    body: "Hi, Just a follow-up on...",
    starred: false,
    archived: false,
    bin: false,
    draft: false,
    sent: false,
    spam: false,
  },
  {
    id: "12",
    from: "promo@example.com",
    subject: "Special Offer Inside",
    snippet: "Limited time deal just for you...",
    date: "2023-10-16T09:00:00Z",
    category: "promotions",
    read: true,
    body: "Don't miss out on this special offer...",
    starred: false,
    archived: false,
    bin: false,
    draft: false,
    sent: false,
    spam: false,
  },
  {
    id: "13",
    from: "family@example.com",
    subject: "Weekend Plans",
    snippet: "What are you up to this weekend?...",
    date: "2023-10-15T18:00:00Z",
    category: "personal",
    read: false,
    body: "Hey, Any plans for the weekend?",
    starred: true,
    archived: false,
    bin: false,
    draft: false,
    sent: false,
    spam: false,
  },
   {
    id: "14",
    from: "alert@example.com",
    subject: "Security Alert",
    snippet: "Unusual activity detected on your account...",
    date: "2023-10-15T10:00:00Z",
    category: "important",
    read: false,
    body: "Please review the recent activity on your account...",
    starred: false,
    archived: false,
    bin: false,
    draft: false,
    sent: true,
    spam: false,
  },
     {
    id: "15",
    from: "draft2@example.com",
    subject: "Another Draft",
    snippet: "Continuing to work on this...",
    date: "2023-10-14T11:00:00Z",
    category: "work",
    read: false,
    body: "Draft email body...",
    starred: false,
    archived: false,
    bin: false,
    draft: true,
    sent: false,
    spam: false,
  },
   {
    id: "16",
    from: "deleted@example.com",
    subject: "Item in Bin",
    snippet: "This is a deleted item...",
    date: "2023-10-13T16:00:00Z",
    category: "promotions",
    read: true,
    body: "This email is in the bin.",
    starred: false,
    archived: false,
    bin: true,
    draft: false,
    sent: false,
    spam: false,
  },
    {
    id: "17",
    from: "security@example.com",
    subject: "Important Security Notice",
    snippet: "Please read immediately regarding your account...",
    date: "2023-10-12T09:30:00Z",
    category: "important",
    read: false,
    body: "This is an important security notice...",
    starred: false,
    archived: false,
    bin: false,
    draft: false,
    sent: false,
    spam: false,
  },
     {
    id: "18",
    from: "offers@example.com",
    subject: "Last Chance Discount",
    snippet: "Don't miss out on our offer ending soon...",
    date: "2023-10-11T14:00:00Z",
    category: "promotions",
    read: true,
    body: "Shop now and save!",
    starred: false,
    archived: false,
    bin: false,
    draft: false,
    sent: false,
    spam: false,
  },
     {
    id: "19",
    from: "spam2@example.com",
    subject: "Claim Your Prize Now!!!",
    snippet: "You've won a free gift card...",
    date: "2023-10-10T10:00:00Z",
    category: "spam",
    read: false,
    body: "Click here to claim your prize.",
    starred: false,
    archived: false,
    bin: false,
    draft: false,
    sent: false,
    spam: true,
  },
       {
    id: "20",
    from: "team@example.com",
    subject: "Meeting Minutes",
    snippet: "Minutes from our last meeting...",
    date: "2023-10-09T11:00:00Z",
    category: "work",
    read: true,
    body: "Please review the minutes from our meeting.",
    starred: false,
    archived: false,
    bin: false,
    draft: false,
    sent: false,
    spam: false,
  },
];

// Helper to format date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Placeholder for different views - will dynamically render later
const renderView = (section: string, emails: any[], onSelectEmail: (id: string) => void) => {
  let filteredEmails = [];
  let title = "";

  switch (section) {
    case 'starred':
      filteredEmails = emails.filter(email => email.starred);
      title = "Starred";
      break;
    case 'categories':
      return <CategoriesView />;
    case 'drafts':
        filteredEmails = emails.filter(email => email.draft);
        title = "Drafts";
       break;
    case 'sent':
        filteredEmails = emails.filter(email => email.sent);
        title = "Sent";
        break;
     case 'spam': // Added Spam view
        filteredEmails = emails.filter(email => email.spam);
        title = "Spam";
        break;
    case 'archive':
         filteredEmails = emails.filter(email => email.archived);
         title = "Archive";
         break;
    case 'bin':
         filteredEmails = emails.filter(email => email.bin);
         title = "Bin";
        break;
    case 'billing':
         return <BillingView />;
    case 'settings':
          return <SettingsView />;
    case 'inbox':
    default:
      filteredEmails = emails.filter(email => !email.archived && !email.bin && !email.spam); // Exclude archived, bin, and spam from inbox
      title = "Inbox";
      break;
  }
   return <InboxView emails={filteredEmails} onSelectEmail={onSelectEmail} title={title} />;
};

// Placeholder for different views
const InboxView = ({ onSelectEmail, emails, title }: any) => (
  <div className="flex-1 flex flex-col min-w-0">
    {/* Fixed Search and Filter Bar */}
    <div className="bg-gray-800 shadow-sm p-3 rounded-lg mb-4 flex items-center justify-between sticky top-0 z-10 mx-4 mt-4">
      <div className="relative flex-1 mr-4">
        <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search emails..."
          className="w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="relative flex items-center space-x-3">
         <BsFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
         <select className="pl-10 pr-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-200 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
           <option value="">All Categories</option>
           {/* Map dummy categories here later */}
           <option value="work">Work</option>
           <option value="personal">Personal</option>
           <option value="promotions">Promotions</option>
            <option value="important">Important</option>
         </select>
         {/* Refresh Button */}
         <button className="text-gray-400 hover:text-gray-200 p-2 rounded-md hover:bg-gray-700">
            <BsArrowRepeat className="text-lg" />
         </button>
      </div>
    </div>

    {/* Scrollable Email List */}
    <div className="flex-1 overflow-y-auto p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-200">{title}</h2>

      {emails.length === 0 ? (
        <p className="text-center text-gray-400">No emails in this folder.</p>
      ) : (
        emails.map((email: any) => (
          <div
            key={email.id}
            className={`border-b border-gray-700 py-3 px-4 cursor-pointer hover:bg-gray-700 ${email.read ? 'bg-gray-800' : 'bg-blue-900 bg-opacity-30'} flex items-center`}
            onClick={() => onSelectEmail(email.id)}
          >
             {/* Placeholder for profile icon/letter */}
             <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-gray-200 font-semibold mr-3">{email.from[0].toUpperCase()}</div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <p className={`font-semibold ${email.read ? 'text-gray-300' : 'text-gray-100'}`}>{email.from}</p>
                <span className="text-xs text-gray-400">{formatDate(email.date)}</span>
              </div>
              <p className={`text-sm mt-0.5 truncate ${email.read ? 'text-gray-400' : 'text-gray-200 font-medium'}`}>{email.subject}</p>
              <div className="flex items-center mt-0.5">
                 <span className="text-xs text-gray-400 truncate flex-1 pr-4">{email.snippet}...</span>
                 {/* Placeholder icons/labels */}
                 {email.category && <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-600 text-white capitalize">{email.category}</span>}
                 <BsStar className="ml-2 text-gray-500" />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);

const EmailDetailView = ({ email, onClose }: any) => (
  <div className="w-full md:w-2/3 lg:w-[500px] xl:w-[600px] bg-gray-900 text-gray-100 shadow-lg h-full flex-shrink-0 flex flex-col overflow-y-auto">
    {/* Detail Header */}
    <div className="flex items-center justify-between p-4 border-b border-gray-700">
      <h2 className="text-xl font-bold">{email.subject}</h2>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-200 text-2xl">&times;</button>
    </div>
    {/* Email Metadata */}
    <div className="p-4 border-b border-gray-700 text-sm text-gray-300">
      <p><span className="font-semibold">From:</span> {email.from}</p>
      <p><span className="font-semibold">To:</span> You</p> {/* Assuming 'To' is always the current user for now */}
      <p><span className="font-semibold">Date:</span> {new Date(email.date).toLocaleString()}</p>
    </div>
    {/* Email Body */}
    <div className="flex-1 overflow-y-auto p-4 whitespace-pre-wrap text-gray-200">
      {email.body}
    </div>
    {/* Quick Actions/Category Change Placeholder */}
    <div className="p-4 border-t border-gray-700 flex justify-end">
      {/* Add buttons for Reply, Reply All, Forward, Change Category here */}
      <button className="ml-2 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-700">Reply</button>
      <button className="ml-2 px-4 py-2 bg-gray-700 text-gray-200 rounded hover:bg-gray-600">Forward</button>
    </div>
  </div>
);

export default function MailSectionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const selectedEmailId = searchParams.get('emailId');
  const currentSection = Array.isArray(params.section) ? params.section[0] : params.section;
  const currentView = currentSection || 'inbox';

  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);

  const handleSelectEmail = (emailId: string) => {
    router.push(`/mail1/${currentView}?emailId=${emailId}`);
  };

  const handleCloseEmailDetail = () => {
    router.push(`/mail1/${currentView}`);
  };

  const handleOpenComposeModal = () => {
    setIsComposeModalOpen(true);
  };

  const handleCloseComposeModal = () => {
    setIsComposeModalOpen(false);
  };

  // Find the selected email from dummy data
  const selectedEmail = dummyEmails.find(email => email.id === selectedEmailId);

  return (
    <RequireAuth>
      {/* Main App Container */}
      <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 shadow-md p-4 flex flex-col flex-shrink-0 h-full">
           {/* Logo and Theme Toggle */}
           <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                 {/* Logo Placeholder */}
                 <div className="w-8 h-8 bg-indigo-600 rounded-md mr-2"></div>
                 <span className="text-xl font-bold text-gray-100">MailAI</span>
              </div>
              {/* Theme Toggle Placeholder */}
              <button className="text-gray-400 hover:text-gray-200">
                 <BsMoon className="text-xl" /> {/* Use Sun or Moon icon based on theme state */}
              </button>
           </div>

          <div className="text-center mb-6">
             {/* User Info */}
             <div className="w-12 h-12 rounded-full bg-indigo-600 mx-auto flex items-center justify-center text-white font-bold text-lg">S</div>
             <p className="mt-2 text-sm font-semibold text-gray-100">Sarthak Italiya</p>
             <p className="text-xs text-gray-400">sarthak.italiya@gmail.com</p>
          </div>
          {/* Compose Button */}
          <button onClick={handleOpenComposeModal} className="inline-block w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition mb-6">+ Compose</button>
          
          <nav className="flex-1 space-y-1 overflow-y-auto">
            {/* Navigation Links */}
            <Link href="/mail1/inbox" className={`flex items-center p-2 rounded-md ${currentView === 'inbox' ? 'bg-gray-700 text-gray-100' : 'text-gray-400 hover:bg-gray-700 hover:text-gray-100'}`}>
              <BsInbox className="mr-3 text-lg" /> Inbox
            </Link>
            <Link href="/mail1/starred" className={`flex items-center p-2 rounded-md ${currentView === 'starred' ? 'bg-gray-700 text-gray-100' : 'text-gray-400 hover:bg-gray-700 hover:text-gray-100'}`}>
              <BsStar className="mr-3 text-lg" /> Starred
            </Link>
             <Link href="/mail1/categories" className={`flex items-center p-2 rounded-md ${currentView === 'categories' ? 'bg-gray-700 text-gray-100' : 'text-gray-400 hover:bg-gray-700 hover:text-gray-100'}`}>
              <BsTag className="mr-3 text-lg" /> Categories
            </Link>
             <Link href="/mail1/drafts" className={`flex items-center p-2 rounded-md ${currentView === 'drafts' ? 'bg-gray-700 text-gray-100' : 'text-gray-400 hover:bg-gray-700 hover:text-gray-100'}`}>
              <BsFileText className="mr-3 text-lg" /> Drafts
            </Link>
             <Link href="/mail1/sent" className={`flex items-center p-2 rounded-md ${currentView === 'sent' ? 'bg-gray-700 text-gray-100' : 'text-gray-400 hover:bg-gray-700 hover:text-gray-100'}`}>
              <BsFileText className="mr-3 text-lg" /> Sent
            </Link>
            <Link href="/mail1/archive" className={`flex items-center p-2 rounded-md ${currentView === 'archive' ? 'bg-gray-700 text-gray-100' : 'text-gray-400 hover:bg-gray-700 hover:text-gray-100'}`}>
              <BsArchive className="mr-3 text-lg" /> Archive
            </Link>
             <Link href="/mail1/bin" className={`flex items-center p-2 rounded-md ${currentView === 'bin' ? 'bg-gray-700 text-gray-100' : 'text-gray-400 hover:bg-gray-700 hover:text-gray-100'}`}>
              <BsTrash className="mr-3 text-lg" /> Bin
            </Link>
            {/* Added Spam Link */}
             <Link href="/mail1/spam" className={`flex items-center p-2 rounded-md ${currentView === 'spam' ? 'bg-gray-700 text-gray-100' : 'text-gray-400 hover:bg-gray-700 hover:text-gray-100'}`}>
               <BsTrash className="mr-3 text-lg" /> Spam
            </Link>
          </nav>

          {/* Bottom Links */}
           <div className="mt-auto space-y-1 border-t border-gray-700 pt-4">
            <Link href="/mail1/billing" className={`flex items-center p-2 rounded-md ${currentView === 'billing' ? 'bg-gray-700 text-gray-100' : 'text-gray-400 hover:bg-gray-700 hover:text-gray-100'}`}>
               <BsCreditCard className="mr-3 text-lg" /> Billing
            </Link>
             <Link href="/mail1/settings" className={`flex items-center p-2 rounded-md ${currentView === 'settings' ? 'bg-gray-700 text-gray-100' : 'text-gray-400 hover:bg-gray-700 hover:text-gray-100'}`}>
               <BsGear className="mr-3 text-lg" /> Settings
            </Link>
           </div>

        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-x-hidden overflow-y-auto">
          {/* Dynamic Content Area */}

          {/* Render full-width views when no email is selected */}
          {!selectedEmail && (currentView === 'categories' || currentView === 'billing' || currentView === 'settings') && (
             <>{renderView(currentView, dummyEmails, handleSelectEmail)}</>
           )}

          {/* Render split view (email list and detail) when email is selected */}
          {selectedEmail && (currentView !== 'categories' && currentView !== 'billing' && currentView !== 'settings') && (
               <div className="flex flex-1 min-w-0">
                  {/* Email List (Shrunk) */}
                  <div className="flex-1 md:w-1/3 overflow-y-auto min-w-0">
                     {renderView(currentView, dummyEmails, handleSelectEmail)}
                  </div>

                  {/* Email Detail Panel */}
                   <div className="flex-none md:w-2/3 lg:w-[500px] xl:w-[600px] flex-col overflow-y-auto bg-gray-900 text-gray-100 shadow-lg">
                      <EmailDetailView email={selectedEmail} onClose={handleCloseEmailDetail} />
                   </div>
               </div>
           )}

            {/* Render email list only when no email is selected and it's not a full-width view*/}
             {!selectedEmail && (currentView !== 'categories' && currentView !== 'billing' && currentView !== 'settings') && (
                 <div className="flex-1 w-full overflow-y-auto min-w-0">
                    {renderView(currentView, dummyEmails, handleSelectEmail)}
                 </div>
             )}

        </div>
      </div>
      {/* Compose Modal */}
      <ComposeModal isOpen={isComposeModalOpen} onClose={handleCloseComposeModal} />
    </RequireAuth>
  );
}