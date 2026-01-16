import React from 'react';
import authImg from '../assets/undraw_authentication_1evl.svg'
import { Outlet, useNavigate } from 'react-router';


const AuthLayout = () => {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate('/')
    }
    return (
        <div>
            <div className="flex justify-end">
                <button onClick={handleGoBack} className="btn btn-primary mt-8 mr-8">Go Back</button>
            </div>
            <div className='flex items-center mt-10'>
                <div className='flex-1'>
                    <img className='w-full' src={authImg} alt="" />
                </div>
                <div className='flex-1 '>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;