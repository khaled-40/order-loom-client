import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import { MdPreview } from 'react-icons/md';
import { Link } from 'react-router';

const MyOrders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: orders = [] } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/byEmail?email=${user.email}`)
            return res.data;
        }
    })
    return (
        <div>
            <h2 className='text-2xl font-bold'>My Orders : <span className='text-primary'>({orders.length})</span></h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Payment</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.productTitle}</td>
                            <td>{order.quantity}</td>
                            <td>{order.status}</td>
                            <td>{order?.payment}</td>
                            <td>
                                <Link to={`/dashboard/order-details/${order._id}`}>
                                    <button className='btn btn-sm mr-1'>
                                        <MdPreview />
                                    </button>
                                </Link>
                                {
                                    order.status === 'pending' &&
                                    <button
                                        className="btn btn-sm">
                                        Cancel
                                    </button>
                                }
                            </td>
                        </tr>)}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;