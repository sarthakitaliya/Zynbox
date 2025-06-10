"use client";

import { memo } from 'react';
import { useEmailStore } from "@repo/store";

interface Email {
  id: string;
  from: string;
  subject: string;
  date: string;
  body: string;
}

interface EmailDetailProps {
  onClose: () => void;
}

const EmailDetail = memo(({ onClose }: EmailDetailProps) => {
  // Only subscribe to the selected email from the store
  const email = useEmailStore((state) => state.selectedEmail) as Email | null;

  if (!email) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-2/3 bg-white shadow-lg transform transition-transform ease-in-out duration-300 translate-x-0 z-50 flex flex-col">
      {/* Detail Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold">{email.subject}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
      </div>
      
      {/* Email Metadata */}
      <div className="p-4 border-b border-gray-200 text-sm text-gray-700">
        <p><span className="font-semibold">From:</span> {email.from}</p>
        <p><span className="font-semibold">To:</span> You</p>
        <p><span className="font-semibold">Date:</span> {new Date(email.date).toLocaleString()}</p>
      </div>
      
      {/* Email Body */}
      <div className="flex-1 overflow-y-auto p-4 whitespace-pre-wrap text-gray-800">
        {email.body}
      </div>
      
      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-200 flex justify-end">
        <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Reply</button>
        <button className="ml-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Forward</button>
      </div>
    </div>
  );
});

EmailDetail.displayName = 'EmailDetail';

export default EmailDetail; 