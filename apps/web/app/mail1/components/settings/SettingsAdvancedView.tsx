import React from 'react';
import { BsKeyboard, BsDownload } from 'react-icons/bs';
import { RiDeleteBinLine } from 'react-icons/ri';

const SettingsAdvancedView: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Keyboard Shortcuts */}
      <div className="space-y-4">
        <div className="flex items-center mb-4">
          <BsKeyboard className="text-teal-400 mr-3 text-2xl" />
          <div>
            <h3 className="text-xl font-bold text-gray-100">Keyboard Shortcuts</h3>
            <p className="text-gray-400 text-sm">Customize keyboard shortcuts for faster navigation</p>
          </div>
        </div>

        <div className="space-y-3 text-gray-300">
          <div className="flex justify-between items-center">
            <span>Compose new email</span>
            <span className="px-2 py-1 text-xs font-semibold rounded bg-gray-700 text-gray-200">Ctrl + N</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Reply to email</span>
            <span className="px-2 py-1 text-xs font-semibold rounded bg-gray-700 text-gray-200">Ctrl + R</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Forward email</span>
            <span className="px-2 py-1 text-xs font-semibold rounded bg-gray-700 text-gray-200">Ctrl + F</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Search emails</span>
            <span className="px-2 py-1 text-xs font-semibold rounded bg-gray-700 text-gray-200">Ctrl + K</span>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="space-y-4">
        <div className="flex items-center mb-4">
          <BsDownload className="text-yellow-400 mr-3 text-2xl" />
          <div>
            <h3 className="text-xl font-bold text-gray-100">Data Management</h3>
            <p className="text-gray-400 text-sm">Export, import, or delete your data</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Export Data */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-100 font-semibold">Export Data</p>
              <p className="text-gray-400 text-sm">Download all your emails and settings</p>
            </div>
            <button className="px-4 py-2 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 transition flex items-center">
              <BsDownload className="mr-2" /> Export
            </button>
          </div>

          {/* Import Data */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-100 font-semibold">Import Data</p>
              <p className="text-gray-400 text-sm">Import emails from another service</p>
            </div>
            <button className="px-4 py-2 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 transition flex items-center">
              <BsDownload className="mr-2" /> Import
            </button>
          </div>

          {/* Delete Account */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-100 font-semibold">Delete Account</p>
              <p className="text-gray-400 text-sm">Permanently delete your account and all data</p>
            </div>
            <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition flex items-center">
              <RiDeleteBinLine className="mr-2" /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsAdvancedView; 