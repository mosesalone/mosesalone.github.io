import React from 'react';
import HeroSection from '../components/home/HeroSection';
import WhyUsSection from '../components/home/WhyUsSection';
import FeesSection from '../components/home/FeesSection';

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <WhyUsSection />
      <FeesSection />
    </div>
  );
};

export default HomePage;