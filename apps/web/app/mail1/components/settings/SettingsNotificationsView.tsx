import React from 'react';
import { BsBell } from 'react-icons/bs';

const SettingsNotificationsView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <BsBell className="text-blue-400 mr-3 text-2xl" />
        <div>
          <h3 className="text-xl font-bold text-gray-100">Notification Preferences</h3>
          <p className="text-gray-400 text-sm">Choose how you want to be notified</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Email Notifications */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-100 font-semibold">Email Notifications</p>
            <p className="text-gray-400 text-sm">Receive notifications via email</p>
          </div>
          {/* Toggle Switch Placeholder */}
          <label className="inline-flex relative items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Push Notifications */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-100 font-semibold">Push Notifications</p>
            <p className="text-gray-400 text-sm">Receive push notifications on mobile</p>
          </div>
          {/* Toggle Switch Placeholder */}
          <label className="inline-flex relative items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Desktop Notifications */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-100 font-semibold">Desktop Notifications</p>
            <p className="text-gray-400 text-sm">Show notifications on desktop</p>
          </div>
          {/* Toggle Switch Placeholder */}
          <label className="inline-flex relative items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" defaultChecked /> {/* Example: defaultChecked */}
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Sound Notifications */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-100 font-semibold">Sound Notifications</p>
            <p className="text-gray-400 text-sm">Play sound for new emails</p>
          </div>
          {/* Toggle Switch Placeholder */}
          <label className="inline-flex relative items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" defaultChecked /> {/* Example: defaultChecked */}
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SettingsNotificationsView; 