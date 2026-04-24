import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [statusLoading, setStatusLoading] = useState(false);
    const [user, setUser] = useState(null);
    const editModalRef = useRef();
    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });
    const handleEditModal = user => {
        setUser(user);
        editModalRef.current.showModal();
    }
    const handleStatusChange = async (status) => {
        setStatusLoading(true)
        const approval = { status };
        try {
            const statusChangeRes = await axiosSecure.patch(`/users/${user._id}`, approval);
            refetch();
            editModalRef.current.close();
            if (statusChangeRes.data.modifiedCount) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `This user has been ${status}`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Payment Failed",
                text: error.response?.data?.message || error.message || "Something went wrong",
                footer: '<a href="#">Why did this happen?</a>'
            });
        } finally {
            setStatusLoading(false)
        }

        // console.log(approval)
    }
    return (
        <div>
            <h2 className='text-2xl font-bold'>Manage Users ({users.length})</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-6">
                                        <span className="loading loading-spinner text-neutral"></span>
                                    </td>
                                </tr>
                            ) :
                                users.map((user, index) => <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td className='space-x-1'>
                                        <button
                                            className='btn btn-sm'
                                            onClick={() => handleEditModal(user)}
                                        ><FiEdit />
                                        </button>
                                        <button

                                            className='btn btn-sm'>
                                            <MdDelete />
                                        </button>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog ref={editModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Manage User Access</h3>

                    {user && (
                        <div className="mt-4 space-y-2">
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>

                            <div className="mt-2">
                                <span className="text-sm mr-2">Current status:</span>
                                <span
                                    className={`badge ${user?.adminApproval === 'approved'
                                        ? 'badge-success'
                                        : user?.adminApproval === 'suspended'
                                            ? 'badge-error'
                                            : 'badge-warning'
                                        }`}
                                >
                                    {
                                        user?.adminApproval || 'unchecked'
                                    }
                                </span>
                            </div>
                        </div>
                    )}

                    <div className="modal-action flex justify-between">
                        <form method="dialog">
                            <button className="btn">Cancel</button>
                        </form>

                        <div className="space-x-2">
                            <button
                                onClick={() => handleStatusChange('approved')}
                                className={`btn btn-primary ${user?.adminApproval === 'approved' ? 'hidden' : ''}`}
                            >
                                {statusLoading ? <span className="loading loading-spinner text-info"></span> : 'Approve'}
                            </button>

                            <button
                                onClick={() => handleStatusChange('suspended')}
                                className={`btn btn-error ${user?.adminApproval === 'suspended' ? 'hidden' : ''}`}
                            >
                                {statusLoading ? <span className="loading loading-spinner text-neutral"></span> : 'Suspend'}
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>

        </div>
    );
};

export default ManageUsers;