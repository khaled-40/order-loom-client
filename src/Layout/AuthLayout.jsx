import React from 'react';
import authImg from '../assets/undraw_authentication_1evl.svg'
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='flex items-center mt-10'>
            <div className='flex-1'>
                <img className='w-full' src={authImg} alt="" />
            </div>
            <div className='flex-1 '>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default AuthLayout;