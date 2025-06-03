import React from 'react';
import { BsCheckCircleFill } from 'react-icons/bs'; // Example icon

interface PlanCardProps {
  plan: {
    name: string;
    price: string;
    period: string;
    features: string[];
    isCurrent?: boolean;
  };
}

const PlanCard: React.FC<PlanCardProps> = ({ plan }) => {
  return (
    <div className={`rounded-lg shadow-lg p-6 flex flex-col ${plan.isCurrent ? 'bg-gray-800 border border-blue-600' : 'bg-gray-800 border border-gray-700'}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-gray-100">{plan.name}</h3>
        {plan.isCurrent && (
          <span className="px-3 py-1 text-xs rounded-full bg-blue-600 text-white font-semibold">Current</span>
        )}
      </div>
      <div className="text-gray-100 mb-6">
        <span className="text-3xl font-bold">{plan.price}</span>
        <span className="text-sm text-gray-400">{plan.period}</span>
      </div>
      <ul className="space-y-3 text-gray-300 flex-grow">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <BsCheckCircleFill className="text-green-500 mr-2 mt-1 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button className={`mt-8 w-full py-3 rounded-md font-semibold transition ${plan.isCurrent ? 'bg-gray-700 text-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`} disabled={plan.isCurrent}>
        {plan.isCurrent ? 'Current Plan' : 'Upgrade'}
      </button>
    </div>
  );
};

export default PlanCard; 