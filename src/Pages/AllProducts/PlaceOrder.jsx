// import React, { useMemo } from 'react';
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';

const PlaceOrder = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { id } = useParams();
  const { data: product = {} } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`)
      return res.data;
    }
  })
  console.log(product)



  const [quantity, setQuantity] = useState(product?.minimumOrder || 0);
  const [checkoutUrl, setCheckoutUrl] = useState(null);



  const { data: myUser } = useQuery({
    queryKey: ['user', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/byEmail?email=${user.email}`);
      return res.data;
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: user?.email,
      quantity: product.minimumOrder,
    },
  });


  const totalPrice = quantity * product.price;
  console.log(quantity, totalPrice, product.price)

  const onSubmit = async (data) => {
    setQuantity(data.quantity)
    const paymentInfo = {
      ...data,
      email: user.email,
      productId: product._id,
      productTitle: product.title,
      unitPrice: product.price,
      totalPrice,
      paymentOptions: product.paymentOptions
    };

    console.log(paymentInfo);

    if (paymentInfo.paymentOptions === 'stripe' && myUser.adminApproval === 'approved') {
      console.log('add stripe checkout session')
      const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
      console.log(res.data);
      setCheckoutUrl(res.data.url);
      axiosSecure.post('/orders', paymentInfo)
        .then(res => {
          console.log(res.data)
        })
    }
    else {
      axiosSecure.post('/orders', { paymentInfo, adminApproval: myUser.adminApproval })
        .then(res => {
          console.log(res.data);
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your order has been placed",
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
    }
  };
  useEffect(() => {
    // refetch();
    if (checkoutUrl) {
      window.location.assign(checkoutUrl);
    }
  }, [checkoutUrl]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        Booking & Order Confirmation
      </h1>
      <p className="text-gray-500 mb-8">
        Please review the details carefully before placing your order
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:col-span-2 bg-base-100 rounded-2xl shadow-md p-6 space-y-5"
        >

          {/* Email */}
          <div>
            <label className="label">Email</label>
            <input
              readOnly
              className="input input-bordered w-full bg-base-200"
              defaultValue={user?.email}
            />
          </div>

          {/* Product Title */}
          <div>
            <label className="label">Product Name</label>
            <input
              readOnly
              className="input input-bordered w-full bg-base-200"
              defaultValue={product.title}
            />
          </div>

          {/* Price Info */}
          <div>
            <label className="label">Unit Price</label>
            <input
              readOnly
              className="input input-bordered w-full bg-base-200"
              defaultValue={`$${product.price}`}
            />
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">First Name</label>
              <input
                className="input input-bordered w-full"
                placeholder='First Name'
                {...register('firstName', { required: true })}
              />
              {errors.firstName && (
                <p className="text-error text-xs">Required</p>
              )}
            </div>

            <div>
              <label className="label">Last Name</label>
              <input
                className="input input-bordered w-full"
                placeholder='Last Name'
                {...register('lastName', { required: true })}
              />
              {errors.lastName && (
                <p className="text-error text-xs">Required</p>
              )}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="label">
              Order Quantity
              <span className="ml-2 text-xs text-gray-500">
                (Min: {product.minimumOrder}, Available: {product.availableQuantity})
              </span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              defaultValue={product.minimumOrder}
              {...register('quantity', {
                onChange: e => setQuantity(e.target.value),
                required: true,
                valueAsNumber: true,
                min: product.minimumOrder,
                max: product.availableQuantity,
              })}
            />
            {errors.quantity && (
              <p className="text-error text-xs mt-1">
                Quantity out of allowed range
              </p>
            )}
          </div>

          {/* Total Price */}
          <div>
            <label className="label">Total Price</label>
            <input
              readOnly
              className="input input-bordered w-full bg-base-200 font-semibold"
              value={`$${totalPrice.toFixed(2)}`}
            />
          </div>

          <div>
            <legend className="fieldset-legend">Payment Method</legend>
            <input
              readOnly
              className="input input-bordered w-full bg-base-200 font-semibold"
              value={product.paymentOptions}
            />
          </div>


          {/* Contact */}
          <div>
            <label className="label">Contact Number</label>
            <input
              type="tel"
              className="input input-bordered w-full"
              placeholder='Your Contact'
              {...register('contact', { required: true })}
            />
            {errors.contact && (
              <p className="text-error text-xs">Required</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="label">Delivery Address</label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder='Your Address'
              rows={3}
              {...register('address', { required: true })}
            />
            {errors.address && (
              <p className="text-error text-xs pt-2">Required</p>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="label">Additional Notes</label>
            <textarea
              className="textarea textarea-bordered w-full"
              rows={2}
              {...register('notes')}
              placeholder="Optional instructions"
            />
          </div>

          <button className="btn btn-primary w-full text-lg">
            Place Order
          </button>
        </form>

        {/* SUMMARY */}
        <aside className="bg-base-100 rounded-2xl shadow-md p-6 h-fit sticky top-24">
          <h2 className="font-bold text-lg mb-4">Order Summary</h2>

          <div className="flex gap-4 items-center">
            <img
              src={product.images}
              alt={product.title}
              className="w-20 h-20 rounded-xl object-cover"
            />
            <div>
              <p className="font-semibold">{product.title}</p>
              <p className="text-sm text-gray-500">${product.price} / unit</p>
            </div>
          </div>

          <div className="divider" />

          <div className="flex justify-between text-sm">
            <span>Quantity</span>
            <span>{quantity}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Total</span>
            <span className="font-semibold">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
        </aside>

      </div>
    </section>
  );
};

export default PlaceOrder;
