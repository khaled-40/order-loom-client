import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import LatestProducts from './LatestProducts';
import HowItWorks from './HowItWorks';
import Footer from './Footer';
import Reviews from './Reviews';

const reviewPromise = fetch('/reviews.json').then(res => res.json());

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <LatestProducts></LatestProducts>
            <HowItWorks></HowItWorks>
            <Reviews reviewPromise={reviewPromise}></Reviews>
        </div>
    );
};

export default Home;