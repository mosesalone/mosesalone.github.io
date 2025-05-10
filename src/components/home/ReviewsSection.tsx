import React from 'react';
import { useReviews } from '../../contexts/ReviewsContext';

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const getRatingText = (rating: string): string => {
  switch (rating) {
    case '⭐⭐⭐⭐⭐':
      return 'Very Good';
    case '⭐⭐⭐⭐':
      return 'Good';
    case '⭐⭐⭐':
      return 'Okay';
    default:
      return '';
  }
};

const ReviewsSection: React.FC = () => {
  const { reviews } = useReviews();
  
  return (
    <div className="fixed top-4 right-4 z-50 w-72">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Latest Reviews
        </h2>
        
        <div className="space-y-3">
          {reviews.map((review) => (
            <div 
              key={review.id}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Dealver User (Anonymous)
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-warning-400">
                  {review.rating}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {getRatingText(review.rating)}
                </span>
              </div>
              
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {formatDate(review.createdAt)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;