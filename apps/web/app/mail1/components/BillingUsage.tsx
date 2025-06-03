import React from 'react';
import { BsLightning } from 'react-icons/bs'; // Example icon

const BillingUsage: React.FC = () => {
  // Dummy data for usage
  const emailUsage = 342;
  const emailLimit = 1000;
  const accountsUsed = 3;
  const accountsLimit = 3;

  const emailUsagePercentage = (emailUsage / emailLimit) * 100;
  const accountsUsagePercentage = (accountsUsed / accountsLimit) * 100;

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8 border border-gray-700">
      <div className="flex items-center mb-4">
        <BsLightning className="text-blue-400 mr-3 text-2xl" />
        <div>
          <h2 className="text-2xl font-bold text-gray-100">Billing & Usage</h2>
          <p className="text-gray-400">Manage your subscription and view usage statistics</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between text-gray-100 mb-2">
          <p className="font-semibold">Current Plan: Free</p>
          <span className="px-3 py-1 text-xs rounded-full bg-green-600 text-white font-semibold">Active</span>
        </div>
        <p className="text-sm text-gray-400 mb-4">You're currently on the Free plan</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email Usage */}
          <div>
            <div className="flex justify-between text-gray-300 text-sm mb-1">
              <span>Email Usage</span>
              <span>{emailUsage} / {emailLimit}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${emailUsagePercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-400 mt-1">{emailUsagePercentage.toFixed(0)}% of monthly limit used</p>
          </div>

          {/* Email Accounts */}
          <div>
            <div className="flex justify-between text-gray-300 text-sm mb-1">
              <span>Email Accounts</span>
              <span>{accountsUsed} / {accountsLimit}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${accountsUsagePercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-400 mt-1">{accountsLimit - accountsUsed} accounts remaining</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingUsage; 