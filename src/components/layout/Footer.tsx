import React from 'react';
import { Shield, MessageCircle, Shield as LogoIcon } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-primary-600 dark:text-primary-400">
              <LogoIcon size={24} className="stroke-primary-600 dark:stroke-primary-400" />
              <span className="text-xl font-bold tracking-tight">Dealver</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-xs">
              The safest way to complete your transactions without the fear of being scammed.
              No KYC required. Complete anonymity guaranteed.
            </p>
          </div>
          
          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/" 
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="/login" 
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  Login
                </a>
              </li>
              <li>
                <a 
                  href="/register" 
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  Register
                </a>
              </li>
              <li>
                <a 
                  href="/dashboard" 
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  Dashboard
                </a>
              </li>
            </ul>
          </div>
          
          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Features</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Shield size={20} className="text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">Secure middleman service</span>
              </li>
              <li className="flex items-start space-x-2">
                <Shield size={20} className="text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">Complete anonymity</span>
              </li>
              <li className="flex items-start space-x-2">
                <MessageCircle size={20} className="text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">Secure private messaging</span>
              </li>
              <li className="flex items-start space-x-2">
                <Shield size={20} className="text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">Multiple payment methods</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Dealver. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Privacy focused. No KYC required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;