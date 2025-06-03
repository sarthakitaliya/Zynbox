import React from 'react';
import BillingUsage from './BillingUsage';
import PaymentMethod from './PaymentMethod';
import AvailablePlans from './AvailablePlans';
import BillingHistory from './BillingHistory';

const BillingView: React.FC = () => {
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <BillingUsage />
      <PaymentMethod />
      <AvailablePlans />
      <BillingHistory />
    </div>
  );
};

export default BillingView; 