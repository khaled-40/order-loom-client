import React from 'react';
import logoImg from '../assets/orderloom-high-resolution-logo-transparent.png'
import { Link, Outlet } from 'react-router';
import { FaBackward } from "react-icons/fa6";
import { FaUsers } from 'react-icons/fa';
import { GiBrickPile } from "react-icons/gi";
import { IoReorderThreeSharp } from "react-icons/io5";
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { FiBox } from "react-icons/fi";

const DashboardLayout = () => {
    return (
        <div className="drawer lg:drawer-open">

            {/* CHANGE: Renamed drawer id for clarity (UI readability only) */}
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

            {/* ===================== MAIN CONTENT ===================== */}
            <div className="drawer-content flex flex-col">

                {/* ===================== NAVBAR ===================== */}
                <nav className="navbar bg-base-300 px-2 lg:px-6 shadow-sm">
                    {/* CHANGE: Added padding + subtle shadow for elevation */}

                    {/* Sidebar toggle (mobile) */}
                    <label
                        htmlFor="dashboard-drawer"
                        aria-label="open sidebar"
                        className="btn btn-square btn-ghost lg:hidden"
                    >
                        {/* CHANGE: Cleaner icon (less visual noise) */}
                        ☰
                    </label>

                    {/* CHANGE: Replaced generic title with project-specific branding */}
                    <div className="flex-1">
                        <h1 className='text-xl font-bold text-primary'>Order Loom Dashboard</h1>
                    </div>

                    {/* CHANGE: Right-side spacing reserved for future UI elements */}
                    <div className="flex-none"></div>
                </nav>

                {/* ===================== PAGE CONTENT ===================== */}
                {/* CHANGE: Added max-width and breathing space */}
                <main className="p-2 md:p-6 bg-base-100 min-h-screen max-w-7xl mx-auto w-full">
                    {/* Page Content */}
                    <Outlet></Outlet>
                </main>
            </div>

            {/* ===================== SIDEBAR ===================== */}
            <div className="drawer-side">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

                {/* CHANGE: Sidebar spacing, clearer contrast, better hierarchy */}
                <aside className="w-64 bg-base-200 min-h-full px-4 py-6">

                    {/* CHANGE: Sidebar header for identity */}
                    <Link className='flex gap-2 p-1' to={'/'}>
                        <FaBackward />
                        <div>
                            <img className='w-40 h-10' src={logoImg} alt="" />
                            <p className="text-xs text-gray-500">
                                Product & Order Management
                            </p>
                        </div>
                    </Link>


                    <ul className="menu gap-2">

                        {/* CHANGE: Section label improves scanability */}
                        <li className="menu-title">
                            <span>Main</span>
                        </li>

                        {/* Admin Routes */}
                        <li>
                            <Link to={'/dashboard/manage-users'} className="flex items-center gap-3 rounded-lg">
                                <FaUsers /> <span>Manage Users</span>
                            </Link>
                        </li>


                        <li>
                            <Link to={'/dashboard/all-products'} className="flex items-center gap-3 rounded-lg">
                                <GiBrickPile /> <span>All Products</span>
                            </Link>
                        </li>

                        <li>
                            <Link to={'/dashboard/all-orders'} className="flex items-center gap-3 rounded-lg">
                                <IoReorderThreeSharp /> <span>All Orders</span>
                            </Link>
                        </li>

                        {/* Manger Routes */}
                        <li>
                            <Link to={'/dashboard/add-product'} className="flex items-center gap-3 rounded-lg">
                                <MdOutlineAddShoppingCart /> <span>Add Product</span>
                            </Link>
                        </li>

                        
                        <li>
                            <Link to={'/dashboard/manage-products'} className="flex items-center gap-3 rounded-lg">
                                <FiBox /> <span>Manage Products</span>
                            </Link>
                        </li>

                        <li>
                            <a className="flex items-center gap-3 rounded-lg">
                                📦 <span>Products</span>
                            </a>
                        </li>

                        <li>
                            <a className="flex items-center gap-3 rounded-lg">
                                🛒 <span>Orders</span>
                            </a>
                        </li>

                        {/* CHANGE: Visual separation */}
                        <div className="divider my-2"></div>

                        <li className="menu-title">
                            <span>Account</span>
                        </li>

                        <li>
                            <a className="flex items-center gap-3 rounded-lg">
                                ⚙️ <span>Settings</span>
                            </a>
                        </li>

                        <li>
                            <a className="flex items-center gap-3 rounded-lg text-error">
                                🚪 <span>Logout</span>
                            </a>
                        </li>

                    </ul>
                </aside>
            </div>
        </div>

    );
};

export default DashboardLayout;