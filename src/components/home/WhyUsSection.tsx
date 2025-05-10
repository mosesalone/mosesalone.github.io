import React from 'react';
import { Shield, Lock, Wallet, MessageCircle, Clock, Bitcoin, CreditCard, Gift } from 'lucide-react';

const features = [
  {
    icon: <Shield size={24} className="text-primary-600 dark:text-primary-400" />,
    title: 'Scam-Free Transactions',
    description: 'Our platform offers the safest way to complete your transactions without any risk of being scammed.'
  },
  {
    icon: <Lock size={24} className="text-primary-600 dark:text-primary-400" />,
    title: 'Complete Anonymity',
    description: 'No KYC required. Your privacy is our top priority, ensuring your personal information stays protected.'
  },
  {
    icon: <MessageCircle size={24} className="text-primary-600 dark:text-primary-400" />,
    title: 'Secure Communication',
    description: 'Private chat rooms for secure communication between all parties involved in the transaction.'
  },
  {
    icon: <Clock size={24} className="text-primary-600 dark:text-primary-400" />,
    title: 'Real-time Middleman',
    description: 'Experienced middlemen available in real-time to ensure smooth, secure, and controlled transactions.'
  }
];

const paymentMethods = [
  {
    icon: <Bitcoin size={24} />,
    name: 'Cryptocurrencies',
    methods: ['Bitcoin', 'Ethereum', 'Litecoin', 'USDT'],
    color: 'from-orange-500 to-yellow-500'
  },
  {
    icon: <CreditCard size={24} />,
    name: 'Digital Payments',
    methods: ['PayPal', 'CashApp', 'Wise', 'Revolut'],
    color: 'from-blue-500 to-indigo-500'
  },
  {
    icon: <Gift size={24} />,
    name: 'Gift Cards',
    methods: ['Amazon', 'Steam', 'iTunes', 'Google Play'],
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: <Wallet size={24} />,
    name: 'Other Methods',
    methods: ['Bank Transfer', 'Western Union', 'MoneyGram'],
    color: 'from-purple-500 to-pink-500'
  }
];

const WhyUsSection: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Dealver?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Dealver is the best choice for secure and scam-free transactions with complete anonymity and professional middleman service.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 transition-all duration-300 hover:shadow-md"
            >
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Accepted Payment Methods
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paymentMethods.map((method, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${method.color} flex items-center justify-center mb-4 shadow-lg`}>
                  {method.icon}
                </div>
                
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  {method.name}
                </h4>
                
                <ul className="space-y-2">
                  {method.methods.map((item, idx) => (
                    <li key={idx} className="text-gray-600 flex items-center">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <p className="text-gray-500 text-center mt-8 text-sm">
            Additional payment methods may be available upon request. Contact support for more information.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;