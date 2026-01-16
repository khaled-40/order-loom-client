import React from 'react';
import { Link, NavLink } from 'react-router';
import './Navbar.css'



const Navbar = () => {
    const links = <>
        <NavLink to={'/'}>Home</NavLink>
        <NavLink to={'/all-products'}>All Products</NavLink>
        <NavLink to={'/contact'}>Contact</NavLink>
        <NavLink to={'/about-us'}>About Us</NavLink>
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <h2 className="mr-2 text-3xl font-bold">Order<span className='text-primary'>Loom</span></h2>
            </div>
            <div className="navbar-end ">
                <ul className="menu menu-horizontal px-1 hidden md:flex space-x-2">
                    {links}
                </ul>
                <>
                    <Link to={'/auth/login'} className='btn btn-primary'>LogIn</Link>
                    <Link to={'/auth/register'} className='btn ml-2 btn-primary'>Register</Link>
                </>
            </div>

        </div>
    );
};

export default Navbar;