import React from 'react';
import { DollarSign } from 'lucide-react';

const FeeCard: React.FC<{
  title: string;
  amount: string;
  fee: string;
  description: string;
}> = ({ title, amount, fee, description }) => {
  return (
    <div className="rounded-xl p-6 transition-all duration-300 relative bg-white dark:bg-gray-800 shadow-card">
      <div className="mb-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30">
          <DollarSign 
            size={24} 
            className="text-primary-600 dark:text-primary-400"
          />
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
        {title}
      </h3>
      
      <div className="mb-4">
        <div className="text-sm mb-1 uppercase font-medium opacity-80">Transaction Amount</div>
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          {amount}
        </div>
      </div>
      
      <div className="mb-6">
        <div className="text-sm mb-1 uppercase font-medium opacity-80">Service Fee</div>
        <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
          {fee}
        </div>
      </div>
      
      <p className="mb-6 text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
};

const FeesSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[100%] bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-primary-500/10 animate-[gradient_8s_linear_infinite]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Transparent Fee Structure
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Dealver applies a service fee for using its middleman services. Our fee structure is designed to be fair and transparent.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <FeeCard
            title="Small Transactions"
            amount="Below $120"
            fee="0%"
            description="Zero fees for smaller transactions to help you get started with our service."
          />
          
          <FeeCard
            title="Medium Transactions"
            amount="$120 - $250"
            fee="15%"
            description="Our most common tier with balanced protection and service fees."
          />
          
          <FeeCard
            title="Large Transactions"
            amount="Above $250"
            fee="5%"
            description="Reduced percentage for larger transactions with full service benefits."
          />
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Fees are calculated based on the total transaction amount and are automatically applied. 
            The fee is deducted only when the transaction is successfully completed.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeesSection;