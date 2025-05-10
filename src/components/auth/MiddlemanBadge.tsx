import React from 'react';
import { Shield } from 'lucide-react';

interface MiddlemanBadgeProps {
  isAvailable: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const MiddlemanBadge: React.FC<MiddlemanBadgeProps> = ({ isAvailable, size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };
  
  const dotSizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5'
  };
  
  return (
    <div className={`inline-flex items-center px-2 py-1 rounded-full ${
      isAvailable 
        ? 'bg-success-50 text-success-700 dark:bg-success-900/20 dark:text-success-300' 
        : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
    } ${sizeClasses[size]}`}>
      <Shield size={size === 'sm' ? 12 : size === 'md' ? 14 : 16} className="mr-1" />
      <span>Middleman</span>
      <span className={`${dotSizeClasses[size]} rounded-full ${
        isAvailable 
          ? 'bg-success-500 animate-pulse' 
          : 'bg-gray-400'
      } ml-1.5`}></span>
    </div>
  );
};

export default MiddlemanBadge;