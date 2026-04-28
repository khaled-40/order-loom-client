import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { MdPreview } from "react-icons/md";
import { Link } from 'react-router';

const AdminAllOrders = () => {
    const axiosSecure = useAxiosSecure();
    const { data: orders = [],isLoading } = useQuery({
        queryKey: ['orders', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/orders');
            return res.data;
        }
    })
    console.log(orders)
    return (
        <div>
            <h2 className='text-2xl font-bold'>Manage Orders <span className='text-primary'>({orders.length})</span></h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>User</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-6">
                                        <span className="loading loading-spinner text-neutral"></span>
                                    </td>
                                </tr>
                            ) :
                                orders.map(order => <tr key={order._id}>
                                    <th>{order._id}</th>
                                    <td>{order.firstName}</td>
                                    <td>{order.product}</td>
                                    <td>{order.quantity}</td>
                                    <td>{order.status}</td>
                                    <td>
                                        <Link to={`/dashboard/order-details/${order._id}`}>
                                            <button className='btn btn-sm'>
                                                <MdPreview />
                                            </button>
                                        </Link>
                                    </td>
                                </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminAllOrders;