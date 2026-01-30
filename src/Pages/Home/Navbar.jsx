import React from 'react';
import { Link, NavLink } from 'react-router';
import './Navbar.css';
import useAuth from '../../Hooks/useAuth';
import { CiLogout } from "react-icons/ci";
import { toast } from 'react-toastify';



const Navbar = () => {
    const { user, signOutUser } = useAuth();
    const links = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/all-products'}>All Products</NavLink></li>
        {
            user ?
                <li><NavLink to={'/dashboard'}>Dashboard</NavLink></li>
                :
                <><li><NavLink to={'/contact'}>Contact</NavLink></li>
                    <li><NavLink to={'/about-us'}>About Us</NavLink></li>
                </>
        }
    </>;
    const handleLogout = () => {
        signOutUser()
            .then(() => {
                toast.info("Session ended successfully", {
                    style: {
                        background: "linear-gradient(to right, #065F46, #334155)",
                        color: "#fff",
                    },
                    autoClose: 2000,
                });
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="rounded-md p-2 hover:bg-gray-300 lg:hidden">
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
                <ul className="menu menu-horizontal px-1 hidden lg:flex items-center">
                    {links}
                </ul>
                {
                    !user ? (
                        <>
                            <Link to={'/auth/login'} className='btn btn-primary'>LogIn</Link>
                            <Link to={'/auth/register'} className='btn ml-2 btn-primary'>Register</Link>
                        </>
                    ) : (
                        <div className="dropdown dropdown-end relative z-50 ml-1">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        src={user?.photoURL }
                                        alt="user avatar"
                                    />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
                                {/* <li><ThemeToggle></ThemeToggle></li> */}
                                <li><a onClick={handleLogout}><CiLogout />Logout</a></li>
                            </ul>
                        </div>
                    )
                }

            </div>

        </div>
    );
};

export default Navbar;