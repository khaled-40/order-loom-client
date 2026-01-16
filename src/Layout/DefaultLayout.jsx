import React from 'react';
import Navbar from '../Pages/Home/Navbar';
import { Outlet } from 'react-router';

const DefaultLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default DefaultLayout;