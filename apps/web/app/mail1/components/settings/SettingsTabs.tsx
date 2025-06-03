import React, { useState } from 'react';
import SettingsGeneralView from './SettingsGeneralView';
import SettingsNotificationsView from './SettingsNotificationsView';
import SettingsPrivacyView from './SettingsPrivacyView';
import SettingsAppearanceView from './SettingsAppearanceView';
import SettingsEmailView from './SettingsEmailView';
import SettingsAdvancedView from './SettingsAdvancedView';

const SettingsTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return <SettingsGeneralView />;
      case 'notifications':
        return <SettingsNotificationsView />;
      case 'privacy':
        return <SettingsPrivacyView />;
      case 'appearance':
        return <SettingsAppearanceView />;
      case 'email':
        return <SettingsEmailView />;
      case 'advanced':
        return <SettingsAdvancedView />;
      default:
        return <SettingsGeneralView />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-700">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('general')}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'general' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'}`}
            >
              General
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'notifications' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'}`}
            >
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'privacy' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'}`}
            >
              Privacy
            </button>
            <button
              onClick={() => setActiveTab('appearance')}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'appearance' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'}`}
            >
              Appearance
            </button>
            <button
              onClick={() => setActiveTab('email')}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'email' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'}`}
            >
              Email
            </button>
            <button
              onClick={() => setActiveTab('advanced')}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'advanced' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'}`}
            >
              Advanced
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default SettingsTabs; 