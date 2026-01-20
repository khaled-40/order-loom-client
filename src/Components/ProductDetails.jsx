import React, { useRef } from 'react';
import { useLoaderData, Link } from 'react-router';
import useAuth from '../Hooks/useAuth';
// import useAuth from '../../Hooks/useAuth'; // assumed

const ProductDetails = () => {
  const { user } = useAuth();
  const product = useLoaderData();
  const orderModalRef = useRef();
  // const { user, role } = useAuth();

  // TEMP logic (replace with real auth)
  // const user = { email: 'test@test.com' }; // logged in mock
  const role = 'buyer'; // 'admin' | 'manager' | 'buyer'

  const isOrderDisabled = !user || role === 'admin' || role === 'manager';

  const handleOrderModalOpen = () => {
    orderModalRef.current.showModal();
  }

  const handleOrderModalClose = () => {
    orderModalRef.current.close();
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* LEFT: Media */}
        <div className="bg-base-100 rounded-2xl border shadow-sm overflow-hidden">
          <img
            src={product.images}
            alt={product.title}
            className="w-full h-105 object-cover"
          />
        </div>

        {/* RIGHT: Details */}
        <div className="space-y-6">

          {/* Category */}
          <span className="inline-block text-sm px-3 py-1 rounded-full bg-primary/10 text-primary">
            {product.category}
          </span>

          {/* Title */}
          <h1 className="text-3xl font-bold leading-tight">
            {product.title}
          </h1>

          {/* Price */}
          <p className="text-2xl font-semibold text-gray-900">
            ${product.price}
          </p>

          {/* Stock info */}
          <div className="flex gap-6 text-sm text-gray-600">
            <p>
              Available:
              <span className="font-medium text-gray-900 ml-1">
                {product.availableQuantity}
              </span>
            </p>
            <p>
              Minimum Order:
              <span className="font-medium text-gray-900 ml-1">
                {product.minimumOrder}
              </span>
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed">
            {product.description}
          </p>

          {/* Payment Options */}
          <div>
            <h3 className="text-sm font-semibold mb-2">
              Payment Options
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.paymentOptions.map(option => (
                <span
                  key={option}
                  className="px-3 py-1 text-xs rounded-full border bg-base-200"
                >
                  {option.toUpperCase()}
                </span>
              ))}
            </div>
          </div>

          {/* Action */}
          <div className="pt-6">
            {isOrderDisabled ? (
              <button
                disabled
                className="btn btn-disabled w-full cursor-not-allowed"
              >
                Order Not Available
              </button>
            ) : (
              <Link
                className="btn btn-primary w-full"
                onClick={handleOrderModalOpen}
              >
                Book / Order Now
              </Link>
            )}

            {!user && (
              <p className="text-xs text-gray-500 mt-2 text-center">
                Please log in to place an order
              </p>
            )}
          </div>

        </div>
      </div>
      {/* Booking Modal */}
      {/* Booking Modal */}
      <dialog ref={orderModalRef} className="modal modal-middle">
        <div className="modal-box max-w-2xl rounded-2xl">

          {/* Header */}
          <h3 className="text-2xl font-bold mb-1">
            Complete Your Order
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Review product details and place your booking
          </p>

          {/* Form */}
          <form className="space-y-4">

            {/* Email */}
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                readOnly
                className="input input-bordered w-full bg-base-200"
                placeholder="user@email.com"
              />
            </div>

            {/* Product Title */}
            <div>
              <label className="label">Product</label>
              <input
                type="text"
                readOnly
                className="input input-bordered w-full bg-base-200"
                placeholder="Wireless Noise-Canceling Headphones"
              />
            </div>

            {/* Price */}
            <div>
              <label className="label">Price (per unit)</label>
              <input
                type="text"
                readOnly
                className="input input-bordered w-full bg-base-200"
                placeholder="$129.99"
              />
            </div>

            {/* Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">First Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="First name"
                />
              </div>

              <div>
                <label className="label">Last Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Last name"
                />
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="label">Order Quantity</label>
              <input
                type="number"
                className="input input-bordered w-full"
                placeholder="Enter quantity"
              />
              <p className="text-xs text-gray-500 mt-1">
                Must be within available stock and minimum order quantity
              </p>
            </div>

            {/* Total Price */}
            <div>
              <label className="label">Total Price</label>
              <input
                type="text"
                readOnly
                className="input input-bordered w-full bg-base-200"
                placeholder="$259.98"
              />
            </div>

            {/* Payment Method (NEW FIELD) */}
            <div>
              <label className="label">Payment Method</label>
              <select className="select select-bordered w-full">
                <option value="">Select payment method</option>
                <option value="STRIPE">Online Payment (Stripe)</option>
                <option value="COD">Cash on Delivery</option>
              </select>
            </div>

            {/* Contact */}
            <div>
              <label className="label">Contact Number</label>
              <input
                type="tel"
                className="input input-bordered w-full"
                placeholder="+880 1XXXXXXXXX"
              />
            </div>

            {/* Address */}
            <div>
              <label className="label">Delivery Address</label>
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Enter full delivery address"
              ></textarea>
            </div>

            {/* Notes */}
            <div>
              <label className="label">Additional Notes</label>
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Any special instructions (optional)"
              ></textarea>
            </div>

            {/* Actions */}
            <div className="modal-action">
              <button type="button"
               onClick={handleOrderModalClose} 
              className="btn btn-ghost">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Confirm Order
              </button>
            </div>
          </form>
        </div>

        {/* Backdrop */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>


    </section>
  );
};

export default ProductDetails;
