import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import DefaultLayout from "../Layout/DefaultLayout";
import AllProducts from "../Pages/AllProducts/AllProducts";
import Contact from "../Pages/Contact/Contact";
import AboutUs from "../Pages/AboutUs/AboutUs";
import AuthLayout from "../Layout/AuthLayout";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import DashboardLayout from "../Layout/DashboardLayout";
import ProductDetails from "../Pages/AllProducts/ProductDetails";
import PlaceOrder from "../Pages/AllProducts/PlaceOrder";
import ManageUsers from "../Pages/Dahsboard/AdminDashboard/ManageUsers";
import AdminAllProducts from "../Pages/Dahsboard/AdminDashboard/AdminAllProducts";
import AdminAllOrders from "../Pages/Dahsboard/AdminDashboard/AdminAllOrders";
import AddProudct from "../Pages/Dahsboard/ManagerDashboard/AddProudct";
import ManageProducts from "../Pages/Dahsboard/ManagerDashboard/ManageProducts";
import OrderDetails from "../Pages/Dahsboard/AdminDashboard/OrderDetails";
import PendingOrders from "../Pages/Dahsboard/ManagerDashboard/PendingOrders";
import ApprovedOrders from "../Pages/Dahsboard/ManagerDashboard/ApprovedOrders";

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
            {
                path: 'place-order/:id',
                Component: PlaceOrder,
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
            {
                path: '/dashboard/manage-users',
                Component: ManageUsers
            },
            {
                path: '/dashboard/all-products',
                Component: AdminAllProducts
            },
            {
                path: '/dashboard/all-orders',
                Component: AdminAllOrders
            },
            {
                path: '/dashboard/add-product',
                Component: AddProudct
            },
            {
                path: '/dashboard/manage-products',
                Component: ManageProducts
            },
            {
                path: '/dashboard/order-details/:id',
                Component: OrderDetails,
                loader: ({ params }) => fetch(`http://localhost:3000/orders/${params.id}`).then(res => res.json())
            },
            {
                path: '/dashboard/pending-orders',
                Component: PendingOrders,
            },
            {
                path: '/dashboard/approved-orders',
                Component: ApprovedOrders,
            },
        ]
    }
]);