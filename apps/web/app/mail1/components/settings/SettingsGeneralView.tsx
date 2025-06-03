import React from 'react';
import { BsGlobe } from 'react-icons/bs';

const SettingsGeneralView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <BsGlobe className="text-blue-400 mr-3 text-2xl" />
        <div>
          <h3 className="text-xl font-bold text-gray-100">Language & Region</h3>
          <p className="text-gray-400 text-sm">Set your language and regional preferences</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-300">Language</label>
          <select
            id="language"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-600 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            defaultValue="English"
          >
            <option>English</option>
            {/* Add other language options here */}
          </select>
        </div>

        <div>
          <label htmlFor="timezone" className="block text-sm font-medium text-gray-300">Timezone</label>
          <select
            id="timezone"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-600 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            defaultValue="UTC"
          >
            <option>UTC</option>
            {/* Add other timezone options here */}
          </select>
        </div>

        <div>
          <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-300">Date Format</label>
          <select
            id="dateFormat"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-600 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            defaultValue="MM/DD/YYYY"
          >
            <option>MM/DD/YYYY</option>
            {/* Add other date format options here */}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SettingsGeneralView; 