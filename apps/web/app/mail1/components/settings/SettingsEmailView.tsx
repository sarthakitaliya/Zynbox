import React from 'react';
import { BsEnvelope } from 'react-icons/bs';

const SettingsEmailView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <BsEnvelope className="text-blue-400 mr-3 text-2xl" />
        <div>
          <h3 className="text-xl font-bold text-gray-100">Email Preferences</h3>
          <p className="text-gray-400 text-sm">Configure your email handling preferences</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Auto Mark as Read */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-100 font-semibold">Auto Mark as Read</p>
            <p className="text-gray-400 text-sm">Automatically mark emails as read when opened</p>
          </div>
          {/* Toggle Switch Placeholder */}
          <label className="inline-flex relative items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Show Email Preview */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-100 font-semibold">Show Email Preview</p>
            <p className="text-gray-400 text-sm">Show email preview in the list</p>
          </div>
          {/* Toggle Switch Placeholder */}
          <label className="inline-flex relative items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" defaultChecked /> {/* Example: defaultChecked */}
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Conversation Threading */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-100 font-semibold">Conversation Threading</p>
            <p className="text-gray-400 text-sm">Group related emails together</p>
          </div>
          {/* Toggle Switch Placeholder */}
          <label className="inline-flex relative items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" defaultChecked /> {/* Example: defaultChecked */}
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Email Signature */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-100 font-semibold">Email Signature</p>
            <p className="text-gray-400 text-sm">Add signature to outgoing emails</p>
          </div>
          {/* Toggle Switch Placeholder */}
          <label className="inline-flex relative items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SettingsEmailView; 