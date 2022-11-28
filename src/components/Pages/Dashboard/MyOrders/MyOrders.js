import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';

const MyOrders = () => {

    const { user, loading } = useContext(AuthContext)


   //loading orders data from database 
    const url = `https://second-look-server.vercel.app/orders?email=${user?.email}`
    const { data = [], isLoading } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    // console.log(data)

    if (loading || isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <div className='p-5 sm:p-5 md:p-8 lg:p-14 my-5'>
            <h2 className='text-2xl my-4 font-bold text-center'>My Orders</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Email</th>
                            <th>Price</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>

                        {data &&
                            data?.map((order, i) => <tr key={order._id} className="hover">
                                <th>{[i + 1]}</th>
                                <td className="avatar">
                                    <div className="w-20 rounded">
                                        <img src={order.img} alt="" />
                                    </div>
                                </td>
                                <td>{order.itemName}</td>
                                <td>{order.userEmail}</td>
                                <td>${order.price}</td>
                                <td>
                                    {
                                        (order.price && order.paid !== true) &&
                                        <Link to={`/dashboard/payment/${order._id}`}>
                                        <button className='btn btn-primary btn-sm'>Pay</button>
                                        </Link>
                                    }
                                    {
                                        (order.price && order.paid === true) &&
                                        <label className='badge badge-success font-bold p-3' disabled>Paid</label>
                                    }
                                </td>
                            </tr>

                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;