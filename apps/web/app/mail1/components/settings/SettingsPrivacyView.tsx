import React from 'react';
import { BsShield } from 'react-icons/bs';

const SettingsPrivacyView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <BsShield className="text-green-400 mr-3 text-2xl" />
        <div>
          <h3 className="text-xl font-bold text-gray-100">Privacy & Security</h3>
          <p className="text-gray-400 text-sm">Manage your privacy and security settings</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Two-Factor Authentication */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-100 font-semibold">Two-Factor Authentication</p>
            <p className="text-gray-400 text-sm">Add an extra layer of security</p>
          </div>
          <div className="flex items-center">
             <span className="text-sm text-gray-400 mr-2">Disabled</span>
             {/* Toggle Switch Placeholder */}
             <label className="inline-flex relative items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            </label>
          </div>
        </div>

        {/* Read Receipts */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-100 font-semibold">Read Receipts</p>
            <p className="text-gray-400 text-sm">Let senders know when you read their emails</p>
          </div>
          {/* Toggle Switch Placeholder */}
          <label className="inline-flex relative items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" defaultChecked /> {/* Example: defaultChecked */}
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Auto Logout */}
        <div>
          <label htmlFor="autoLogout" className="block text-sm font-medium text-gray-300">Auto Logout (minutes)</label>
          <select
            id="autoLogout"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-600 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            defaultValue="30 minutes"
          >
            <option>5 minutes</option>
            <option>15 minutes</option>
            <option>30 minutes</option>
            <option>1 hour</option>
            <option>Never</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SettingsPrivacyView; 