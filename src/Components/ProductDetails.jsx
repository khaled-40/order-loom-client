import React from 'react';
import { useLoaderData, Link } from 'react-router';
// import useAuth from '../../Hooks/useAuth'; // assumed

const ProductDetails = () => {
  const product = useLoaderData();
  // const { user, role } = useAuth();

  // TEMP logic (replace with real auth)
  const user = { email: 'test@test.com' }; // logged in mock
  const role = 'buyer'; // 'admin' | 'manager' | 'buyer'

  const isOrderDisabled = !user || role === 'admin' || role === 'manager';

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
                to={`/booking/${product._id}`}
                className="btn btn-primary w-full"
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
    </section>
  );
};

export default ProductDetails;
