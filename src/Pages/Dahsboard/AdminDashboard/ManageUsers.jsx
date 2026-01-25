import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [user, setUser] = useState(null);
    const editModalRef = useRef();
    const { data: users = [], refetch } = useQuery({
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
    const handleStatusChange = status => {
        const approval = { status };
        axiosSecure.patch(`/users/${user._id}`, approval)
            .then(res => {
                refetch();
                editModalRef.current.close();
                console.log(res.data)
            })
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
                                Approve
                            </button>

                            <button
                                onClick={() => handleStatusChange('suspended')}
                                className={`btn btn-error ${user?.adminApproval === 'suspended' ? 'hidden' : ''}`}
                            >
                                Suspend
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>

        </div>
    );
};

export default ManageUsers;