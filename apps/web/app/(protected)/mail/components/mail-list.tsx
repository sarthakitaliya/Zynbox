"use client";

import { memo, useCallback, useMemo } from 'react';
import { BsStar } from 'react-icons/bs';
import { useEmailStore } from "@repo/store";

// Helper to format date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

interface Email {
  id: string;
  from: string;
  subject: string;
  snippet: string;
  date: string;
  category: string;
  read: boolean;
}

interface MailListProps {
  onSelectEmail: (emailId: string) => void;
}

// Custom hook to get emails with proper memoization
const useEmails = () => {
  return useEmailStore(
    useCallback((state) => state.emails, [])
  );
};

const EmailItem = memo(({ email, onSelect }: { email: Email; onSelect: (id: string) => void }) => {
  const handleClick = useCallback(() => {
    onSelect(email.id);
  }, [email.id, onSelect]);

  return (
    <div
      className={`border-b border-gray-200 py-3 px-4 cursor-pointer hover:bg-gray-100 ${email.read ? 'bg-white' : 'bg-blue-50'}`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-center">
        <p className={`font-semibold ${email.read ? 'text-gray-800' : 'text-gray-900'}`}>{email.from}</p>
        <span className="text-xs text-gray-500">{formatDate(email.date)}</span>
      </div>
      <p className={`text-sm mt-1 ${email.read ? 'text-gray-600' : 'text-gray-700 font-medium'}`}>{email.subject}</p>
      <div className="flex items-center mt-1">
        <span className="text-xs text-gray-500 truncate flex-1 pr-4">{email.snippet}...</span>
        {email.category && (
          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-200 text-blue-800 capitalize">
            {email.category}
          </span>
        )}
        <BsStar className="ml-2 text-gray-400" />
      </div>
    </div>
  );
});

EmailItem.displayName = 'EmailItem';

const MailList = memo(({ onSelectEmail }: MailListProps) => {
  const emails = useEmails();

  const emailItems = useMemo(() => {
    return emails.map((email) => (
      <EmailItem key={email.id} email={email} onSelect={onSelectEmail} />
    ));
  }, [emails, onSelectEmail]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {/* Search and Filter Bar */}
      <div className="bg-white shadow-sm p-3 rounded-lg mb-4 flex items-center justify-between">
        <input
          type="text"
          placeholder="Search emails..."
          className="flex-1 mr-4 p-2 border border-gray-300 rounded-md"
        />
        <select className="p-2 border border-gray-300 rounded-md">
          <option value="">All Categories</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="promotions">Promotions</option>
        </select>
      </div>

      {emails.length === 0 ? (
        <p className="text-center text-gray-500">No emails in this folder.</p>
      ) : (
        emailItems
      )}
    </div>
  );
});

MailList.displayName = 'MailList';

export default MailList; 