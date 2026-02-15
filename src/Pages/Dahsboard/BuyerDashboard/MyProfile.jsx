import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { toast } from 'react-toastify';

const MyProfile = () => {
    const { user, signOutUser } = useAuth();

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

    if (!user) return <p>Loading...</p>;

    return (
        <div className="p-2 md:p-4 lg:p-8">

            {/* Header */}
            <div className="bg-linear-to-r from-gray-800 to-gray-600 
                            rounded-lg p-8 flex items-center gap-6 text-white">

                <img
                    src={user.photoURL}
                    alt="Profile"
                    className=" w-24 h-24 rounded-full border-4 border-white shadow-md"
                />

                <div>
                    <h2 className="text-2xl font-semibold">
                        {user.displayName || "Unnamed User"}
                    </h2>
                    <p className="opacity-80">{user.email}</p>
                </div>
            </div>

            {/* Info Section */}
            <div className="mt-10 grid md:grid-cols-2 gap-8">

                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        Account Information
                    </h3>

                    <div className="space-y-3 text-sm">
                        <div>
                            <span className="text-gray-500">UID</span>
                            <p className="font-medium">{user.uid}</p>
                        </div>

                        <div>
                            <span className="text-gray-500">Email Verified</span>
                            <p className="font-medium">
                                {user.emailVerified ? "Yes" : "No"}
                            </p>
                        </div>

                        <div>
                            <span className="text-gray-500">Account Created</span>
                            <p className="font-medium">
                                {new Date(user.metadata?.creationTime).toLocaleString()}
                            </p>
                        </div>

                        <div>
                            <span className="text-gray-500">Last Login</span>
                            <p className="font-medium">
                                {new Date(user.metadata?.lastSignInTime).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        Actions
                    </h3>

                    <button
                        onClick={handleLogout}
                        className="px-6 py-2 btn-primary rounded hover:text-white transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
