import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import { MdPreview } from 'react-icons/md';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const MyOrders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: orders = [], refetch, isLoading } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/byEmail`)
            return res.data;
        },
        enabled: !!user?.email
    })
    const handleCancel = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/orders/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
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
                        {
                            isLoading ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-6">
                                        <span className="loading loading-spinner text-neutral"></span>
                                    </td>
                                </tr>
                            ) :
                                (orders.map(order => <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.product}</td>
                                    <td>{order.quantity}</td>
                                    <td>{order.status}</td>
                                    <td>{order?.payment}</td>
                                    <td>
                                        <Link to={`/dashboard/order-details/${order._id}`}>
                                            <button className='btn btn-sm mr-1'>
                                                <MdPreview />
                                            </button>
                                        </Link>
                                        <Link to={`/dashboard/track-order/${order.trackingId}`}>
                                            <button className='btn btn-sm btn-primary mr-1'>
                                                Track Order
                                            </button>
                                        </Link>
                                        {
                                            order.status === 'pending' &&
                                            <button
                                                onClick={() => handleCancel(order._id)}
                                                className="btn btn-sm">
                                                Cancel
                                            </button>
                                        }
                                    </td>
                                </tr>))}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;