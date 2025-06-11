import React from 'react';
import { BsPaperclip, BsArrowRight, BsTypeBold, BsTypeItalic, BsTypeUnderline, BsListUl, BsListOl, BsLink, BsEmojiSmile, BsImage, BsParagraph, BsTextareaT } from 'react-icons/bs'; // Example icons

const ComposeEmailForm: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
      {/* Header (Optional, based on image context - might be part of the main view) */}
      {/* Assuming header is in the main SettingsView for now */}

      {/* Recipient Fields */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center border-b border-gray-700 pb-2">
          <label htmlFor="to" className="w-16 text-sm font-semibold text-gray-300">To:</label>
          <input
            id="to"
            type="text"
            className="flex-1 ml-2 bg-transparent text-gray-100 placeholder-gray-400 focus:outline-none"
            placeholder="Recipients"
          />
        </div>
        <div className="flex items-center border-b border-gray-700 pb-2">
          <label htmlFor="cc" className="w-16 text-sm font-semibold text-gray-300">CC:</label>
          <input
            id="cc"
            type="text"
            className="flex-1 ml-2 bg-transparent text-gray-100 placeholder-gray-400 focus:outline-none"
            placeholder="Cc"
          />
        </div>
        <div className="flex items-center border-b border-gray-700 pb-2">
          <label htmlFor="bcc" className="w-16 text-sm font-semibold text-gray-300">BCC:</label>
          <input
            id="bcc"
            type="text"
            className="flex-1 ml-2 bg-transparent text-gray-100 placeholder-gray-400 focus:outline-none"
            placeholder="Bcc"
          />
        </div>
      </div>

      {/* Subject Field */}
      <div className="border-b border-gray-700 pb-3 mb-6">
        <label htmlFor="subject" className="sr-only">Subject</label>
        <input
          id="subject"
          type="text"
          className="block w-full bg-transparent text-gray-100 placeholder-gray-400 focus:outline-none text-xl font-semibold"
          placeholder="Subject"
        />
      </div>

      {/* Email Body (Placeholder for Rich Text Editor) */}
      <div className="flex-1 overflow-y-auto mb-6 scrollbar-custom">
        <textarea
          className="w-full h-full bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none resize-none"
          placeholder="Compose your email..."
        ></textarea>
      </div>

      {/* Action Buttons and Formatting Toolbar */}
      <div className="flex items-center justify-between border-t border-gray-700 pt-4">
        {/* Left side: Send and Formatting */}
        <div className="flex items-center space-x-4">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center">
            Send <BsArrowRight className="ml-2" />
          </button>
          {/* Formatting Icons Placeholder */}
          <div className="flex items-center space-x-3 text-gray-400">
            <button className="hover:text-gray-200"><BsTypeBold /></button>
            <button className="hover:text-gray-200"><BsTypeItalic /></button>
            <button className="hover:text-gray-200"><BsTypeUnderline /></button>
            <button className="hover:text-gray-200"><BsListUl /></button>
            <button className="hover:text-gray-200"><BsListOl /></button>
            <button className="hover:text-gray-200"><BsLink /></button>
            <button className="hover:text-gray-200"><BsEmojiSmile /></button>
            <button className="hover:text-gray-200"><BsImage /></button>
          </div>
        </div>

        {/* Right side: Attach File */}
        <div>
          <button className="px-4 py-2 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 transition flex items-center">
             <BsPaperclip className="mr-2" /> Attach File
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComposeEmailForm; 