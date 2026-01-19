import React from 'react';
import { useLoaderData } from 'react-router';

const ProductDetails = () => {
    const productData = useLoaderData();
    console.log(productData);
    return (
        <div>
            <h2>item name is {productData?.title}</h2>
        </div>
    );
};

export default ProductDetails;