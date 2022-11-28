import React, { useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import useAdmin from '../../Hooks/useAdmin/useAdmin';
import useSeller from '../../Hooks/useASeller/useSeller';
import useBuyer from '../../Hooks/useBuyer/useBuyer';
import Footer from '../../Shared/Footer/Footer';
import Navbar from '../../Shared/Navbar/Navbar';



const DashboardLayout = () => {

    const { user } = useContext(AuthContext)
    const [isSeller] = useSeller(user?.email)
    const [isAdmin] = useAdmin(user?.email)
    const [isBuyer] = useBuyer(user?.email)

    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content  bg-gray-50">

                    <Toaster></Toaster>
                    <Outlet></Outlet>


                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content">

                        {isBuyer &&
                            <li><Link to="/dashboard/myOrders">MY ORDERS</Link></li>
                        }

                        {isSeller &&
                            <>
                                <li><Link to="/dashboard/addProduct">ADD A PRODUCT</Link></li>
                                <li><Link to="/dashboard/myProducts">MY PRODUCTS</Link></li>
                            </>
                        }

                        {
                            isAdmin &&
                            <>
                                <li><Link to="/dashboard/allSellers">ALL SELLERS</Link></li>
                                <li><Link to="/dashboard/allBuyers">ALL BUYERS</Link></li>
                                <li><Link to="/dashboard/reportedItem">REPORTED ITEMS</Link></li>
                            </>
                        }
                    </ul>

                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;