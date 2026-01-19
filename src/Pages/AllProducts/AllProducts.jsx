import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

const AllProducts = () => {
    const axiosSecure = useAxiosSecure();

    const { data: products = [], isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await axiosSecure('/products');
            return res.data;
        }
    });
    return (
        <div>
            <section className="max-w-7xl mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold mb-8">Explore Our 
                    <span className="text-primary">Products ({products.length})</span>
                </h2>

                {
                    isLoading ?
                        <div className="text-center py-20 text-gray-400">
                            <span className="loading loading-spinner text-neutral"></span>
                        </div>
                        :
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.map((product) => (
                                <div
                                    key={product.title}
                                    className="group bg-base-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border"
                                >
                                    {/* Image */}
                                    <div className="h-56 overflow-hidden">
                                        <img
                                            src={product.images}
                                            alt={product.title}
                                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 space-y-3">
                                        <span className="text-sm text-gray-500">
                                            {product.category}
                                        </span>

                                        <h3 className="text-lg font-semibold leading-tight">
                                            {product.title}
                                        </h3>

                                        <p className="text-sm text-gray-600 line-clamp-2">
                                            {product.description}
                                        </p>

                                        <div className="flex justify-between items-center pt-2">
                                            <div>
                                                <p className="text-lg font-bold text-gray-900">
                                                    ${product.price}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Available: {product.availableQuantity}
                                                </p>
                                            </div>

                                            <Link
                                                to={`/product-details/${product._id}`}
                                                className="btn btn-sm btn-primary"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                }


            </section>
        </div>
    );
};

export default AllProducts;