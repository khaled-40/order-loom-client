import React from 'react';
import Navbar from '../Pages/Home/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Pages/Home/Footer';

const DefaultLayout = () => {
    return (
        <div className=''>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default DefaultLayout;