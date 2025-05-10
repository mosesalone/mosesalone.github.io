import React from 'react';
import { useReviews } from '../contexts/ReviewsContext';
import { CheckCircle, XCircle, ThumbsUp, Award, Shield, RefreshCw } from 'lucide-react';

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const getRatingIcon = (rating: string) => {
  switch (rating) {
    case 'Very Good':
      return <Award className="h-6 w-6 text-warning-400" />;
    case 'Good':
      return <ThumbsUp className="h-6 w-6 text-success-500" />;
    case 'Okay':
      return <Shield className="h-6 w-6 text-primary-500" />;
    default:
      return null;
  }
};

const getRatingColorClass = (rating: string) => {
  switch (rating) {
    case 'Very Good':
      return 'bg-warning-50 text-warning-700 border-warning-200 dark:bg-warning-900/20 dark:text-warning-300 dark:border-warning-800';
    case 'Good':
      return 'bg-success-50 text-success-700 border-success-200 dark:bg-success-900/20 dark:text-success-300 dark:border-success-800';
    case 'Okay':
      return 'bg-primary-50 text-primary-700 border-primary-200 dark:bg-primary-900/20 dark:text-primary-300 dark:border-primary-800';
    default:
      return '';
  }
};

const VouchesPage: React.FC = () => {
  const { reviews } = useReviews();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          User Reviews
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          See what our users say about their experience with Dealver
        </p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 mb-8 flex items-center">
        <RefreshCw className="h-5 w-5 text-primary-500 mr-3 animate-spin-slow" />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Reviews are automatically cleaned every 3 hours to maintain freshness and relevance.
          Only the most recent reviews are displayed.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div 
            key={review.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-card p-6 transition-all duration-300 hover:shadow-card-hover"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium text-gray-900 dark:text-white">
                {review.username}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center ${getRatingColorClass(review.rating)}`}>
                {getRatingIcon(review.rating)}
                <span className="ml-2">{review.rating}</span>
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Fast & Smooth Transaction</span>
                {review.questions.speed ? (
                  <CheckCircle className="h-5 w-5 text-success-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-error-500" />
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Would Recommend</span>
                {review.questions.recommend ? (
                  <CheckCircle className="h-5 w-5 text-success-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-error-500" />
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Felt Secure</span>
                {review.questions.security ? (
                  <CheckCircle className="h-5 w-5 text-success-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-error-500" />
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Helpful Support</span>
                {review.questions.support ? (
                  <CheckCircle className="h-5 w-5 text-success-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-error-500" />
                )}
              </div>
            </div>
            
            <div className="mt-4 flex justify-between items-center text-sm">
              <span className="text-gray-500 dark:text-gray-400">
                {formatDate(review.createdAt)}
              </span>
              <span className="text-primary-600 dark:text-primary-400 font-mono">
                {review.ticketId}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VouchesPage;