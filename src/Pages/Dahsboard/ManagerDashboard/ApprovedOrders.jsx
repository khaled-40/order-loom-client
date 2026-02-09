import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';

const ApprovedOrders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const openModalRef = useRef();
    const [trackingModal, setTrackingModal] = useState({
        open: false,
        order: null,
        step: {
            key: 'approved',
            next: 'cutting_completed',
            label: 'Cutting Completed',
            defaultLocation: 'Cutting Section',
        },
        location: '',
        note: '',
    });
    const { data: product = [] } = useQuery({
        queryKey: ['product', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/byEmail?email=${user.email}`);
            return res.data;
        }
    })
    console.log(product)
    const { data: orders = [], refetch } = useQuery({
        queryKey: ['orders',product._id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/by-product/${product._id}`);
            return res.data;
        }
    })
    const { data: orderFlow = [] } = useQuery({
        queryKey: ['order-flow'],
        queryFn: async () => {
            const res = await axiosSecure.get('/order-flow');
            return res.data;
        },
    });

    const getNextStatusConfig = (currentStatus) => {
        console.log(currentStatus)
        const currentFlow = orderFlow.find(step => step.key === currentStatus);
        return currentFlow;
    };
    const openTrackingModal = (order, step) => {
        setTrackingModal({
            open: true,
            order,
            step,
            location: step.defaultLocation,
            note: '',
        });
        openModalRef.current.showModal();
    };
    const closeModal = () => {
        openModalRef.current.close();
    };
    const submitTracking = () => {
        axiosSecure.patch(`/orders/${trackingModal.order._id}`, {
            status: trackingModal.step.label,
            trackingId: trackingModal.order.trackingId,
            location: trackingModal.location,
            note: trackingModal.note
        })
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    closeModal();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Order moved to ${trackingModal.step.label}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
    console.log(orders, orderFlow, trackingModal, trackingModal?.location, trackingModal?.step?.label)
    return (
        <div>
            <h2 className='text-2xl font-bold'>Approved Orders : <span className='text-primary'>({orders.length})</span></h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>User</th>
                            <th>Quantity</th>
                            <th>Approved Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => <tr key={order._id}>
                                <th>{order._id}</th>
                                <td>{order.firstName} {order.lastName}</td>
                                <td>{order.quantity}</td>
                                <td>{new Date(order?.approvedAt).toLocaleString()}</td>
                                <td>
                                    {(() => {
                                        const step = getNextStatusConfig(order.status);
                                        console.log(step)
                                        if (!step) return <span className="text-gray-400">Completed</span>;

                                        return (
                                            <button
                                                className="btn btn-sm btn-primary"
                                                onClick={() => openTrackingModal(order, step)}
                                            >
                                                {step.label}
                                            </button>
                                        );
                                    })()}
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            <div>
                <dialog ref={openModalRef} className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Update Order Status</h3>

                        <div className="mt-3 space-y-2">
                            <p>
                                <strong>Current:</strong>
                                <span className="badge ml-2">{trackingModal?.order?.status}</span>
                            </p>

                            <p>
                                <strong>Next:</strong>
                                <span className="badge badge-primary ml-2">
                                    {trackingModal?.step?.label}
                                </span>
                            </p>

                            <label>Next Location</label>

                            <input
                                className="input input-bordered w-full"
                                value={trackingModal.location}
                                onChange={e =>
                                    setTrackingModal(prev => ({ ...prev, location: e.target.value }))
                                }
                            />

                            <textarea
                                className="textarea textarea-bordered w-full"
                                placeholder="Optional note"
                                onChange={e =>
                                    setTrackingModal(prev => ({ ...prev, note: e.target.value }))
                                }
                            />
                        </div>

                        <div className="modal-action">
                            <button className="btn" onClick={closeModal}>Cancel</button>
                            <button className="btn btn-primary" onClick={submitTracking}>
                                Confirm Update
                            </button>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default ApprovedOrders;