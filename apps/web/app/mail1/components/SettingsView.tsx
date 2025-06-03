import React from 'react';
import SettingsTabs from './settings/SettingsTabs';

const SettingsView: React.FC = () => {
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-100">Settings</h1>
        <p className="text-gray-400">Manage your account settings and preferences</p>
      </div>

      {/* Settings Tabs */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
        <SettingsTabs />
      </div>
    </div>
  );
};

export default SettingsView; 