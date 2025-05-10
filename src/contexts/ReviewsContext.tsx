import React, { createContext, useContext, useState, useEffect } from 'react';

export type Rating = 'Very Good' | 'Good' | 'Okay';

export interface Review {
  id: string;
  username: string;
  rating: Rating;
  questions: {
    speed: boolean;
    recommend: boolean;
    security: boolean;
    support: boolean;
  };
  createdAt: Date;
  ticketId: string;
}

interface ReviewsContextType {
  reviews: Review[];
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

const generateRandomTicketId = (): string => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < 5; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return `T${result}H`;
};

const generateRandomReview = (): Review => {
  // Weight towards positive reviews
  const random = Math.random();
  let rating: Rating;
  
  if (random < 0.6) {
    rating = 'Very Good';
  } else if (random < 0.9) {
    rating = 'Good';
  } else {
    rating = 'Okay';
  }
  
  // For Very Good, all questions are true
  // For Good, 3 questions are true
  // For Okay, 2 questions are true
  const questions = {
    speed: rating === 'Very Good' ? true : Math.random() < 0.8,
    recommend: rating === 'Very Good' ? true : Math.random() < 0.8,
    security: rating === 'Very Good' ? true : Math.random() < 0.8,
    support: rating === 'Very Good' ? true : Math.random() < 0.8,
  };
  
  // Generate a date within the last 2 hours
  const now = new Date();
  const twoHoursAgo = new Date(now.getTime() - (2 * 60 * 60 * 1000));
  const randomTime = new Date(twoHoursAgo.getTime() + Math.random() * (now.getTime() - twoHoursAgo.getTime()));
  
  return {
    id: Math.random().toString(36).substring(2, 11),
    username: 'Dealver User (Anonymous)',
    rating,
    questions,
    createdAt: randomTime,
    ticketId: generateRandomTicketId()
  };
};

export const ReviewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  // Initialize with some reviews
  useEffect(() => {
    const initialReviews: Review[] = [];
    
    // Create 6 initial reviews within the last 2 hours
    for (let i = 0; i < 6; i++) {
      initialReviews.push(generateRandomReview());
    }
    
    // Sort by date (newest first)
    initialReviews.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    setReviews(initialReviews);
  }, []);

  // Generate a new review every 15-30 seconds and clean up old reviews every 3 hours
  useEffect(() => {
    const generateReview = () => {
      const newReview = generateRandomReview();
      setReviews(prev => {
        const updated = [newReview, ...prev];
        // Keep only reviews from the last 3 hours
        const threeHoursAgo = new Date(Date.now() - (3 * 60 * 60 * 1000));
        return updated.filter(review => review.createdAt > threeHoursAgo);
      });
      
      // Schedule next review (15-30 seconds)
      const randomSeconds = Math.floor(Math.random() * 15) + 15;
      setTimeout(generateReview, randomSeconds * 1000);
    };
    
    const timeoutId = setTimeout(generateReview, 15000);
    
    // Clean up old reviews every 3 hours
    const cleanupInterval = setInterval(() => {
      setReviews(prev => {
        const threeHoursAgo = new Date(Date.now() - (3 * 60 * 60 * 1000));
        return prev.filter(review => review.createdAt > threeHoursAgo);
      });
    }, 3 * 60 * 60 * 1000);
    
    return () => {
      clearTimeout(timeoutId);
      clearInterval(cleanupInterval);
    };
  }, []);

  return (
    <ReviewsContext.Provider value={{ reviews }}>
      {children}
    </ReviewsContext.Provider>
  );
};

export const useReviews = (): ReviewsContextType => {
  const context = useContext(ReviewsContext);
  if (context === undefined) {
    throw new Error('useReviews must be used within a ReviewsProvider');
  }
  return context;
};