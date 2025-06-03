import React from 'react';
import { BsCalendar, BsDownload } from 'react-icons/bs'; // Example icons

// Dummy data for billing history
const dummyHistory = [
  {
    invoice: 'INV-001',
    date: '1/1/2025',
    plan: 'Free',
    amount: '$0.00',
    status: 'Paid',
  },
  {
    invoice: 'INV-002',
    date: '12/1/2024',
    plan: 'Free',
    amount: '$0.00',
    status: 'Paid',
  },
  {
    invoice: 'INV-003',
    date: '11/1/2024',
    plan: 'Free',
    amount: '$0.00',
    status: 'Paid',
  },
];

const BillingHistory: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <BsCalendar className="text-orange-400 mr-3 text-2xl" />
          <h2 className="text-2xl font-bold text-gray-100">Billing History</h2>
        </div>
        <button className="flex items-center px-4 py-2 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 transition">
          <BsDownload className="mr-2" /> Download All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Invoice</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Plan</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider"></th> {/* For Download Icon */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {dummyHistory.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">{item.invoice}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.plan}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status === 'Paid' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'}`}>{item.status}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-gray-400 hover:text-gray-200">
                    <BsDownload className="text-lg" />
                  </button>
                </td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BillingHistory; 