import React from 'react';

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
                        <h1 className="text-lg font-semibold tracking-wide">
                            OrderLoom Dashboard
                        </h1>
                    </div>

                    {/* CHANGE: Right-side spacing reserved for future UI elements */}
                    <div className="flex-none"></div>
                </nav>

                {/* ===================== PAGE CONTENT ===================== */}
                {/* CHANGE: Added max-width and breathing space */}
                <main className="p-6 bg-base-100 min-h-screen max-w-7xl mx-auto w-full">
                    {/* Page Content */}
                </main>
            </div>

            {/* ===================== SIDEBAR ===================== */}
            <div className="drawer-side">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

                {/* CHANGE: Sidebar spacing, clearer contrast, better hierarchy */}
                <aside className="w-64 bg-base-200 min-h-full px-4 py-6">

                    {/* CHANGE: Sidebar header for identity */}
                    <div className="mb-8">
                        <h2 className="text-xl font-bold">OrderLoom</h2>
                        <p className="text-xs text-gray-500">
                            Product & Order Management
                        </p>
                    </div>

                    <ul className="menu gap-2">

                        {/* CHANGE: Section label improves scanability */}
                        <li className="menu-title">
                            <span>Main</span>
                        </li>

                        {/* CHANGE: Icons aligned + larger hit area */}
                        <li>
                            <a className="flex items-center gap-3 rounded-lg">
                                📊 <span>Dashboard</span>
                            </a>
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