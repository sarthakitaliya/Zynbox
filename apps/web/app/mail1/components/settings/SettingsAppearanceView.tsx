import React from 'react';
import { BsSun, BsMoon } from 'react-icons/bs';

const SettingsAppearanceView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <BsSun className="text-yellow-400 mr-3 text-2xl" /> {/* Using sun/moon icon for appearance */}
        <div>
          <h3 className="text-xl font-bold text-gray-100">Appearance</h3>
          <p className="text-gray-400 text-sm">Customize the look and feel of your dashboard</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Theme Selection */}
        <div>
          <label htmlFor="theme" className="block text-sm font-medium text-gray-300">Theme</label>
          <select
            id="theme"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-600 rounded-md bg-gray-700 text-gray-200 appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            defaultValue="Dark"
          >
            <option>Dark</option>
            <option>Light</option>
            <option>System</option>
          </select>
        </div>

        {/* Display Density */}
        <div>
          <label htmlFor="displayDensity" className="block text-sm font-medium text-gray-300">Display Density</label>
          <select
            id="displayDensity"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-600 rounded-md bg-gray-700 text-gray-200 appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            defaultValue="Comfortable"
          >
            <option>Compact</option>
            <option>Comfortable</option>
            <option>Cozy</option>
          </select>
        </div>

        {/* Collapsed Sidebar */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-100 font-semibold">Collapsed Sidebar</p>
            <p className="text-gray-400 text-sm">Start with sidebar collapsed</p>
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

export default SettingsAppearanceView; 