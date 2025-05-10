import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-b from-primary-600 to-primary-800 text-white py-24 md:py-32 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] -top-48 -right-24 bg-primary-400 rounded-full mix-blend-multiply opacity-20 animate-pulse"></div>
        <div className="absolute w-[300px] h-[300px] top-32 -left-16 bg-secondary-400 rounded-full mix-blend-multiply opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-[400px] h-[400px] -bottom-32 right-16 bg-primary-500 rounded-full mix-blend-multiply opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full opacity-30 animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-white rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-white rounded-full opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-white rounded-full opacity-20 animate-float" style={{ animationDelay: '3s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div 
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6 animate-fade-in hover:bg-white/20 transition-colors duration-300"
            style={{ animationDelay: '0.5s' }}
          >
            <ShieldCheck size={16} className="mr-2 animate-pulse" />
            <span className="text-sm font-medium">100% Secure, 0% Personal Data</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="block animate-slide-up opacity-0" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
              Anonymous Transactions.
            </span>
            <span className="block text-secondary-300 animate-slide-up opacity-0" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
              No KYC Required.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl mx-auto animate-fade-in opacity-0" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
            At Dealver, we prioritize your privacy. No personal data collection is required, 
            and we do not ask for any KYC. Enjoy anonymous transactions with confidence.
          </p>
          
          <div 
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in opacity-0"
            style={{ animationDelay: '1.3s', animationFillMode: 'forwards' }}
          >
            <Link 
              to="/register" 
              className="px-6 py-3 rounded-lg bg-white text-primary-700 hover:bg-gray-100 font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Get Started
            </Link>
            <Link 
              to="/login" 
              className="px-6 py-3 rounded-lg bg-transparent border border-white text-white hover:bg-white/10 font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center group"
            >
              Login 
              <ArrowRight size={18} className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;