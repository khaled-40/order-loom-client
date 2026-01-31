import React from "react";
import { useLoaderData, useNavigate } from "react-router";

const OrderDetails = () => {
    const order = useLoaderData();
    const navigate = useNavigate();
    const {
        _id,
        status,
        productTitle,
        unitPrice,
        quantity,
        totalPrice,
        firstName,
        lastName,
        email,
        contact,
        address,
        notes,
        paymentOptions,
        createdAt,
    } = order || {};
    const handleGoBack = () => {
        navigate('/dashboard/all-orders')
    }

    return (
        <div className="max-w-6xl mx-auto p-2 md:p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Order Details</h2>
                <span
                    className={`badge badge-lg ${status === "pending" ? "badge-warning" : "badge-success"
                        }`}
                >
                    {status}
                </span>
            </div>

            {/* Summary */}
            <div className="stats shadow bg-base-100">
                <div className="stat">
                    <div className="stat-title">Total Amount</div>
                    <div className="stat-value">${totalPrice}</div>
                </div>

                <div className="stat">
                    <div className="stat-title">Quantity</div>
                    <div className="stat-value">{quantity}</div>
                </div>

                <div className="stat">
                    <div className="stat-title">Unit Price</div>
                    <div className="stat-value">${unitPrice}</div>
                </div>
            </div>

            {/* Product Info */}
            <div className="card bg-base-100 shadow">
                <div className="card-body">
                    <h3 className="card-title">Product Information</h3>
                    <p>
                        <span className="font-medium">Product:</span> {productTitle}
                    </p>
                </div>
            </div>

            {/* Customer Info */}
            <div className="card bg-base-100 shadow">
                <div className="card-body">
                    <h3 className="card-title">Customer Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <p>
                            <span className="font-medium">Name:</span> {firstName} {lastName}
                        </p>
                        <p>
                            <span className="font-medium">Email:</span> {email}
                        </p>
                        <p>
                            <span className="font-medium">Contact:</span> {contact}
                        </p>
                        <p>
                            <span className="font-medium">Address:</span> {address}
                        </p>
                    </div>
                </div>
            </div>

            {/* Notes */}
            {notes && (
                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <h3 className="card-title">Customer Notes</h3>
                        <p className="text-sm opacity-80">{notes}</p>
                    </div>
                </div>
            )}

            {/* Order Meta */}
            <div className="card bg-base-100 shadow">
                <div className="card-body">
                    <h3 className="card-title">Order Meta</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <p>
                            <span className="font-medium">Order ID:</span>{" "}
                            <span className="break-all">{_id}</span>
                        </p>
                        <p>
                            <span className="font-medium">Payment:</span> {paymentOptions}
                        </p>
                        <p>
                            <span className="font-medium">Created At:</span>{" "}
                            {new Date(createdAt).toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
                <button 
                onClick={handleGoBack}
                className="btn btn-outline">
                    Back
                </button>
            </div>
        </div>
    );
};

export default OrderDetails;
