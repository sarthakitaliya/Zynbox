import React from 'react';
import PlanCard from './PlanCard';

const dummyPlans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    features: [
      'Up to 1,000 emails/month',
      'Basic AI categorization',
      '3 email accounts',
      'Standard support',
    ],
    isCurrent: true,
  },
  {
    name: 'Pro',
    price: '$9.99',
    period: '/month',
    features: [
      'Up to 10,000 emails/month',
      'Advanced AI features',
      'Unlimited email accounts',
      'Priority support',
      'Custom categories',
      'Email analytics',
    ],
    isCurrent: false,
  },
  {
    name: 'Enterprise',
    price: '$29.99',
    period: '/month',
    features: [
      'Unlimited emails',
      'Custom AI training',
      'Team collaboration',
      '24/7 dedicated support',
      'Advanced security',
      'API access',
    ],
    isCurrent: false,
  },
];

const AvailablePlans: React.FC = () => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-100 mb-6">Available Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyPlans.map(plan => (
          <PlanCard key={plan.name} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default AvailablePlans; 