import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { useRef } from 'react';
import { useForm, Watch } from 'react-hook-form';
import Swal from 'sweetalert2';

const AdminAllProducts = () => {
    const [selectedProduct, setSelectedProduct] = useState({});
    const categories = [
        "Electronics",
        "Clothing",
        "Wearables",
        "Accessories",
        "Home Decor",
        "Computers",
        "Furniture",
        "Kitchen",
        "Audio"
    ];
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const editModalRef = useRef();
    const { data: products = [], refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosSecure.get('/products');
            return res.data;
        }
    });
    const openEditModal = (product) => {
        setSelectedProduct(product)
        // reset(product);
        editModalRef.current.showModal();
        console.log(product)
    };
    useEffect(() => {
        if (selectedProduct && Object.keys(selectedProduct).length > 0) {
            reset(selectedProduct);
        }
    }, [selectedProduct, reset]);
    const closeEditModal = () => {
        reset();
        editModalRef.current.close();
    };
    const handleProductEdit = (data) => {
        data._id = selectedProduct._id;
        console.log(data);
        axiosSecure.patch('/products', data)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Product information has been updated",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    closeEditModal();
                    console.log(res)
                }
            })
    };
    const handleProductDelete = id => {
        axiosSecure.delete(`/products/${id}`)
            .then(res => {
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product has been deleted",
                    showConfirmButton: false,
                    timer: 1500
                });
                console.log(res)
            })
    };
    const handleShowOnHomeToggle = (id, showOnHome) => {
        const toggle = !showOnHome;
        axiosSecure.patch(`/products/${id}/toggle`, { toggle })
            .then(res => {
                console.log(res)
            })
    }
    return (
        <div>
            <h2 className='text-2xl font-bold'>Manage All Products <span className='text-primary'>({products.length})</span></h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>CreatedBy</th>
                            <th>Show on Home</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(product => <tr key={product._id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={product.images}
                                                    alt="Product Image" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{product.title}</td>
                                <td>$ {product.price}</td>
                                <td>{product.category}</td>
                                <td>{product?.createdBy}</td>
                                <td className="text-center">
                                    <input
                                        type="checkbox"
                                        defaultChecked={product.showOnHome}
                                        onChange={() => handleShowOnHomeToggle(product._id, product.showOnHome)}
                                        className="w-5 h-5 cursor-pointer accent-emerald-600"
                                    />
                                </td>
                                <td className='space-x-1'>
                                    <button
                                        className='btn btn-sm'
                                        onClick={() => openEditModal(product)}
                                    ><FiEdit />
                                    </button>
                                    <button
                                        onClick={() => handleProductDelete(product._id)}
                                        className='btn btn-sm'>
                                        <MdDelete />
                                    </button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            <dialog ref={editModalRef} className="modal">
                <div className="modal-box max-w-3xl">
                    <h3 className="text-xl font-semibold mb-4">
                        Update Product
                    </h3>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit(handleProductEdit)();
                        }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Product Name */}
                        <div>
                            <label className="label">
                                <span className="label-text">Product Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Product Name"
                                {...register('title', {
                                    required: true
                                })}
                                className="input input-bordered w-full"
                            />
                            {errors.title && (
                                <p className="text-error text-xs">Required</p>
                            )}
                        </div>

                        {/* Category */}
                        <div>
                            <label className="label">
                                <span className="label-text">Category <span className='text-red-500 text-sm'>(Must change the category)</span></span>
                            </label>
                            <select
                                {...register('category', { required: true })}
                                className="select select-bordered w-full">
                                {
                                    categories.map((category, index) => <option key={index} value={category}>{category}</option>)
                                }
                            </select>
                        </div>

                        {/* Price */}
                        <div>
                            <label className="label">
                                <span className="label-text">Price ($)</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Price"
                                {...register('price', {
                                    required: true
                                })}
                                className="input input-bordered w-full"
                            />
                        </div>

                        {/* Payment Method */}
                        <div>
                            <label className="label">
                                <span className="label-text">
                                    Payment Options
                                </span>
                            </label>
                            <select
                                {...register('paymentOptions', { required: true })}
                                className="select select-bordered w-full">
                                <option>stripe</option>
                                <option>cod</option>
                            </select>
                            {errors.paymentOptions?.type === 'required' && <p className='text-red-700'>Payment Option is required</p>}
                        </div>

                        {/* Images */}
                        <div className="md:col-span-2">
                            <label className="label">
                                <span className="label-text">Product Images (URLs)</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Image URL (comma separated)"
                                {...register('images', {
                                    required: true
                                })}
                                className="input input-bordered w-full"
                            />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea
                                className="textarea textarea-bordered w-full"
                                rows="3"
                                {...register('description', {
                                    required: true
                                })}
                                placeholder="Product description"
                            ></textarea>
                        </div>

                        {/* Actions */}
                        <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                            <button
                                type="button"
                                className="btn btn-outline"
                                onClick={closeEditModal}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Update Product
                            </button>
                        </div>

                    </form>
                </div>
            </dialog>

        </div>
    );
};

export default AdminAllProducts;