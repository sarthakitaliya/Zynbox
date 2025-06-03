import React, { useState } from 'react';
import { BsMagic } from 'react-icons/bs';
import { useEffect, useRef } from 'react';

interface ComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ComposeModal: React.FC<ComposeModalProps> = ({ isOpen, onClose }) => {
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (modalContentRef.current && !modalContentRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]); // Re-run effect if isOpen or onClose changes

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
      {/* Modal Content */}
      <div ref={modalContentRef} className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-2xl text-gray-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200 text-sm">X esc</button>
          {/* Add other header elements if needed */}
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label htmlFor="to" className="block text-sm font-medium text-gray-400">To:</label>
            <input type="text" id="to" placeholder="Enter email" className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-400">Subject:</label>
            <input type="text" id="subject" placeholder="Subject: Re: Design review feedback" className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
             <label htmlFor="cc-bcc" className="sr-only">Cc Bcc</label>
             <div className="flex justify-end text-sm text-gray-400">
                <span>Cc Bcc</span>
             </div>
          </div>
          <div>
            <label htmlFor="body" className="sr-only">Email Body</label>
            <textarea id="body" rows={10} className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:ring-blue-500"></textarea>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="mt-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
                Send <span className="ml-2 text-xs">⌘ Enter</span>
            </button>
            <button className="px-4 py-2 bg-gray-600 text-gray-100 rounded-md hover:bg-gray-700 flex items-center">
                + Add
            </button>
          </div>
           <div>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center">
                 <BsMagic className="mr-2" /> Generate
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ComposeModal; 