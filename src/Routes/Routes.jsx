import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import DefaultLayout from "../Layout/DefaultLayout";
import AllProducts from "../Pages/AllProducts/AllProducts";
import Contact from "../Pages/Contact/Contact";
import AboutUs from "../Pages/AboutUs/AboutUs";
import AuthLayout from "../Layout/AuthLayout";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import ProductDetails from "../Components/ProductDetails";
import DashboardLayout from "../Layout/DashboardLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: DefaultLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'all-products',
                Component: AllProducts
            },
            {
                path: 'contact',
                Component: Contact
            },
            {
                path: 'about-us',
                Component: AboutUs
            },
            {
                path: 'product-details/:id',
                Component: ProductDetails,
                loader: ({ params }) => fetch(`http://localhost:3000/products/${params.id}`).then(res => res.json())
            },
        ]
    },
    {
        path: '/auth',
        Component: AuthLayout,
        children: [
            {
                path: 'register',
                Component: Register
            },
            {
                path: 'login',
                Component: Login
            }
        ]
    },
    {
        path: '/dashboard',
        Component: DashboardLayout,
        children: [
            // {
            //     path: '/manage-users',

            // }
        ]
    }
]);