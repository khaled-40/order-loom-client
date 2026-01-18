import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <h2 className='text-primary text-2xl font-bold'> This is home</h2>
            <button className='btn btn-primary'>Hello</button>
        </div>
    );
};

export default Home;