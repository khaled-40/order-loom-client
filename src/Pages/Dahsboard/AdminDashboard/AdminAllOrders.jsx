import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { MdPreview } from "react-icons/md";
import { Link } from 'react-router';

const AdminAllOrders = () => {
    const axiosSecure = useAxiosSecure();
    const { data: orders = [] } = useQuery({
        queryKey: ['orders', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('orders?status=pending');
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
                            orders.map(order => <tr key={order._id}>
                                <th>{order._id}</th>
                                <td>{order.firstName}</td>
                                <td>{order.productTitle}</td>
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