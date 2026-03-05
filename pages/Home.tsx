import React, { useEffect, useRef } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { ServicesSection } from '../components/home/ServicesSection';

const Home: React.FC = () => {
    return (
        <div className="flex flex-col font-sans">
            <HeroSection />
            {/* <ServicesSection /> */}
        </div>
    );
};

export default Home;