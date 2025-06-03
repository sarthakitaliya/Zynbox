import React from 'react';
import { BsCreditCard } from 'react-icons/bs'; // Example icon

const PaymentMethod: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8 border border-gray-700">
      <div className="flex items-center mb-4">
        <BsCreditCard className="text-purple-400 mr-3 text-2xl" />
        <h2 className="text-2xl font-bold text-gray-100">Payment Method</h2>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {/* Placeholder for card icon */}
          <div className="w-10 h-7 bg-gray-700 rounded mr-4 flex items-center justify-center text-gray-400">
             <BsCreditCard />
          </div>
          <div>
            <p className="text-gray-100 font-semibold">No payment method</p>
            <p className="text-sm text-gray-400">Add a payment method to upgrade</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          Add Payment Method
        </button>
      </div>
    </div>
  );
};

export default PaymentMethod; 