
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';

const AddProudct = () => {
    const { user } = useAuth();
    const [imageURL, setImageURL] = useState(null);
    const [imageUploading, setImageUploading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { data: myUser } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/byEmail?email=${user.email}`);
            return res.data;
        }
    })
    const categories = [
        "Shirt",
        "T-Shirt",
        "Polo Shirt",
        "Pant",
        "Trouser",
        "Jeans",
        "Shorts",
        "Hoodie",
        "Sweater",
        "Jacket",
        "Blazer",
        "Skirt",
        "Kurti",
        "Panjabi",
        "Pajama",
        "Coat",
        "Sportswear",
        "Accessories"
    ];

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const handleImageUpload = async (file) => {
        try {
            setImageUploading(true);

            const formData = new FormData();
            formData.append('image', file);

            const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_product_image}`;

            const res = await axios.post(image_API_URL, formData);
            setImageURL(res.data.data.url);

        } catch (err) {
            console.error(err);
            alert('Image upload failed');
        } finally {
            setImageUploading(false);
        }
    };

    const handleAddProduct = data => {
        data.showOnHome = false;
        data.images = imageURL;
        data.createdByUserEmail = user?.email;
        data.createdBy = user?.displayName;
        console.log(data);
        axiosSecure.post('/products', { data, adminApproval: myUser.adminApproval })
            .then(res => {
                reset();
                console.log(res)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: 'Your product has been added successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }
    return (
        <div className=" max-w-7xl">
            <h3 className="text-xl font-semibold mb-4">
                Add Product
            </h3>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(handleAddProduct)();
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
                    {errors.title?.type === 'required' && <p className='text-red-700'>Product Name is required</p>}
                </div>

                {/* Category */}
                <div>
                    <label className="label">
                        <span className="label-text">Category <span className='text-info text-sm'>(Must choose the category carefully)</span></span>
                    </label>
                    <select
                        {...register('category', { required: true })}
                        className="select select-bordered w-full">
                        {
                            categories.map((category, index) => <option key={index} value={category}>{category}</option>)
                        }
                    </select>
                    {errors.category?.type === 'required' && <p className='text-red-700'>Category is required</p>}
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
                    {errors.price?.type === 'required' && <p className='text-red-700'>Price is required</p>}
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

                {/* Available Quantity */}
                <div className="md:col-span-1">
                    <label className="label">
                        <span className="label-text">Available Quantity</span>
                    </label>
                    <input
                        type="number"
                        placeholder="Add Available Quantity"
                        {...register('availableQuantity', {
                            required: true
                        })}
                        className="input input-bordered w-full"
                    />
                    {errors.availableQuantity?.type === 'required' && <p className='text-red-700'>Available Quantity is required</p>}
                </div>


                {/* Minimum Order Quantitly */}
                <div className="md:col-span-1">
                    <label className="label">
                        <span className="label-text">Minimum Order Quantity</span>
                    </label>
                    <input
                        type="number"
                        placeholder="Minimum Order"
                        {...register('minimumOrder', {
                            required: true
                        })}
                        className="input input-bordered w-full"
                    />
                    {errors.minimumOrder?.type === 'required' && <p className='text-red-700'>There should be a minimum order</p>}
                </div>


                {/* Image Upload */}
                <div className="md:col-span-2">
                    <label className="label">Product Image</label>

                    <input
                        type="file"
                        accept="image/*"
                        className="file-input w-full"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                handleImageUpload(file);
                            }
                        }}
                    />

                    {imageUploading && (
                        <p className="text-info text-sm mt-2">
                            Uploading image...
                        </p>
                    )}

                    {imageURL && (
                        <div className="mt-3">
                            <img
                                src={imageURL}
                                alt="Uploaded"
                                className="w-40 rounded-lg border"
                            />
                            <p className="text-success text-sm mt-1">
                                Image uploaded successfully
                            </p>
                        </div>
                    )}
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
                    {errors.description?.type === 'required' && <p className='text-red-700'>Description is required</p>}
                </div>

                {/* Actions */}
                <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Add Product
                    </button>
                </div>

            </form>
        </div>
    );
};

export default AddProudct;