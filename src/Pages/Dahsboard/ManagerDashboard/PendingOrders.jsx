import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Link } from 'react-router';
import { MdPreview } from 'react-icons/md';
import Swal from 'sweetalert2';

const PendingOrders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: product = {} } = useQuery({
        queryKey: ['product', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products?email=${user.email}`);
            return res.data;
        }
    })
    console.log(product)
    const { data: orders = [], refetch } = useQuery({
        queryKey: ['orders','pending'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/${product._id}?status=pending`);
            return res.data;
        }
    })
    console.log(orders)
    const handleStatus = (order, status) => {
        axiosSecure.patch(`/orders/${order._id}`, {
            status,
            trackingId: order.trackingId
        })
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `This order has been ${status}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
    return (
        <div>
            <h2 className='text-2xl font-bold'>Pending Orders : <span className='text-primary'>({orders.length})</span></h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>User</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Order Date</th>
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
                                <td>{new Date(order.createdAt).toLocaleString()}</td>
                                <td className='space-x-1'>
                                    <Link to={`/dashboard/order-details/${order._id}`}>
                                        <button className='btn btn-sm'>
                                            <MdPreview />
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => handleStatus(order, 'approved')}
                                        className="btn btn-sm btn-success">
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleStatus(order, 'rejected')}
                                        className="btn btn-sm btn-error">
                                        Reject
                                    </button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PendingOrders;