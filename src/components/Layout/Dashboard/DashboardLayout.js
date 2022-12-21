import React, { useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import useAdmin from '../../Hooks/useAdmin/useAdmin';
import useSeller from '../../Hooks/useASeller/useSeller';
import useBuyer from '../../Hooks/useBuyer/useBuyer';
import Footer from '../../Shared/Footer/Footer';
import Navbar from '../../Shared/Navbar/Navbar';
import { ImCross } from 'react-icons/im';
import { MdSpaceDashboard } from 'react-icons/md';


const DashboardLayout = () => {

    const { user } = useContext(AuthContext)
    const [isSeller] = useSeller(user?.email)
    const [isAdmin] = useAdmin(user?.email)
    const [isBuyer] = useBuyer(user?.email)

    return (
        <div>
            <div className='flex items-center gap-3'>
                <Navbar></Navbar>
                <label htmlFor="dashboard-drawer" tabIndex={2} className="btn btn-ghost lg:hidden mx-2">
                    <MdSpaceDashboard className='w-5 h-5'/>
                </label>
            </div>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content  bg-gray-50">

                    <Toaster></Toaster>
                    <Outlet></Outlet>


                </div>
                <div className="drawer-side w-80">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay lg:hidden"></label>
                    <ul className="menu p-4 w-80 text-base-content flex flex-row justify-between">


                        {/* conditional rendering */}
                        <div>
                            {isBuyer &&
                                <li><Link className='font-bold bg-gradient-to-r from-blue-300 to-pink-100 my-3' to="/dashboard/myOrders">MY ORDERS</Link></li>
                            }

                            {isSeller &&
                                <>
                                    <li><Link className='font-bold bg-gradient-to-r from-blue-300 to-pink-100 my-3' to="/dashboard/addProduct">ADD A PRODUCT</Link></li>
                                    <li><Link className='font-bold bg-gradient-to-r from-blue-300 to-pink-100 my-3' to="/dashboard/myProducts">MY PRODUCTS</Link></li>
                                </>
                            }

                            {
                                isAdmin &&
                                <>
                                    <li><Link className='font-bold bg-gradient-to-r from-blue-300 to-pink-100 my-3' to="/dashboard/allSellers">ALL SELLERS</Link></li>
                                    <li><Link className='font-bold bg-gradient-to-r from-blue-300 to-pink-100 my-3' to="/dashboard/allBuyers">ALL BUYERS</Link></li>
                                    <li><Link className='font-bold bg-gradient-to-r from-blue-300 to-pink-100 my-3' to="/dashboard/reportedItem">REPORTED ITEMS</Link></li>
                                </>
                            }
                        </div>




                        <label htmlFor="dashboard-drawer" tabIndex={1} className="btn btn-sm lg:hidden">
                            <ImCross />
                        </label>

                    </ul>

                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;