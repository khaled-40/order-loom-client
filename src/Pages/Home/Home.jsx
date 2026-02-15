import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import LatestProducts from './LatestProducts';
import HowItWorks from './HowItWorks';
import Footer from './Footer';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <LatestProducts></LatestProducts>
            <HowItWorks></HowItWorks>
        </div>
    );
};

export default Home;