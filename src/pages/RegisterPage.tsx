import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';
import { Shield } from 'lucide-react';

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-card p-8 transition-colors duration-300 animate-fade-in">
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <Shield size={32} className="text-primary-600 dark:text-primary-400" />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
            Create an account
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Join Dealver with complete anonymity
          </p>
        </div>
        
        <RegisterForm />
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
            >
              Sign in
            </Link>
          </p>
          
          <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
            <p className="text-xs text-gray-500 dark:text-gray-500">
              <strong>No KYC Required</strong> - We prioritize your privacy and do not collect any personal data.
              Our registration is simple and anonymous.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;