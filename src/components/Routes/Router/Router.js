import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '../../Layout/Dashboard/DashboardLayout';
import Main from '../../Layout/Main';
import NotFoundPage from '../../Pages/404Page/NotFoundPage';
import Blog from '../../Pages/Blog/Blog';
import AddAProduct from '../../Pages/Dashboard/AddAProduct/AddAProduct';
import AllBuyers from '../../Pages/Dashboard/AllBuyers/AllBuyers';
import AllSellers from '../../Pages/Dashboard/AllSellers/AllSellers';
import MyOrders from '../../Pages/Dashboard/MyOrders/MyOrders';
import Payment from '../../Pages/Dashboard/MyOrders/Payment';
import MyProducts from '../../Pages/Dashboard/MyProducts/MyProducts';
import ReportedItem from '../../Pages/Dashboard/ReportedItem/ReportedItem';
import Products from '../../Pages/Home/Category/Products/Products';
import Home from '../../Pages/Home/Home';
import Login from '../../Pages/Login/Login';
import Register from '../../Pages/Register/Register';
import ErrorPage from '../../Shared/ErrorPage/ErrorPage';
import AdminRoute from '../AdminRoute/AdminRoute';
import BuyerRoute from '../BuyerRoute/BuyerRoute';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import SellerRoute from '../SellerRoute/SellerRoute';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/category/:id',
                element: <PrivateRoute><Products></Products></PrivateRoute>
            },
            {
                path: '/blog',
                element: <Blog />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '*',
                element: <NotFoundPage />
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/dashboard',
                element: <>
                    <p className='text-5xl font-bold text-info text-center mt-[30vh] mb-5'>WELCOME TO DASHBOARD</p>
                    <div className='text-center'>
                    <label htmlFor="dashboard-drawer" tabIndex={0} className="btn btn-sm bg-gradient-to-r from-primary to-secondary hover:from-blue-400 text-white lg:hidden">
                        Dashboard Menu
                    </label>
                    </div>
                </>
            },
            {
                path: '/dashboard/myOrders',
                element: <BuyerRoute><MyOrders></MyOrders></BuyerRoute>
            },
            {
                path: '/dashboard/payment/:id',
                element: <BuyerRoute><Payment></Payment></BuyerRoute>
            },
            {
                path: '/dashboard/addProduct',
                element: <SellerRoute><AddAProduct></AddAProduct></SellerRoute>
            },
            {
                path: '/dashboard/myProducts',
                element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
            },
            {
                path: '/dashboard/allSellers',
                element: <AdminRoute><AllSellers></AllSellers></AdminRoute>
            },
            {
                path: '/dashboard/allBuyers',
                element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>
            },
            {
                path: '/dashboard/reportedItem',
                element: <AdminRoute><ReportedItem></ReportedItem></AdminRoute>
            },
            {
                path: '/dashboard/*',
                element: <NotFoundPage />
            }
        ]
    },
])

export default router;