import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../Contexts/AuthProvider';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';

const MyProducts = () => {
    const { user, loading } = useContext(AuthContext)

    //deleting products data from database
    const handleDelete = (id) => {
        const doDelete = window.confirm('Do you want to delete this product?');
        if (doDelete) {
            fetch(`https://second-look-server.vercel.app/seller/products/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount === 1) {
                        toast.error("Deleted Successfully")
                        refetch()
                    }
                })
        }
    }

    //advertisement handler 
    const handleAdvertise = id => {
        fetch(`https://second-look-server.vercel.app/seller/products/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    toast.success('Added for advertisement successful')
                    refetch()
                }
            })
    }



    const url = `https://second-look-server.vercel.app/sellers/products?email=${user?.email}`
    const { data = [], isLoading, refetch } = useQuery({
        queryKey: ['products', user?.email],
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

    if (loading || isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }



    return (
        <div className='p-5 sm:p-5 md:p-8 lg:p-14 my-5'>
            <h2 className='text-2xl my-4 font-bold text-center'>MY PRODUCTS</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th className='w-3'>Title</th>
                            <th>Original Price</th>
                            <th>Resale Price</th>
                            <th>Status</th>
                            <th>Advertise</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>

                        {data &&
                            data?.map((item, i) => <tr key={item._id} className="hover">
                                <th>{[i + 1]}</th>
                                <td className="avatar">
                                    <div className="w-16 rounded">
                                        <img src={item.image} alt="" />
                                    </div>
                                </td>
                                <td className='w-3'>{item.name}</td>
                                <td>${item.originalPrice}</td>
                                <td>${item.resalePrice}</td>
                                <td className={`font-semibold text-center uppercase ${item.status === 'sold' ? 'bg-red-100' : 'bg-green-100'}`}>{item.status}</td>
                                <td>
                                    {(item.status === 'available') &&
                                        <button className='btn btn-warning btn-sm' onClick={() => handleAdvertise(item._id)}>
                                            {(item?.advertise !== true) ?
                                                'Advertise'
                                                :
                                                'Advertising'
                                            }
                                        </button>
                                    }
                                </td>
                                <td><button className='btn btn-error btn-sm' onClick={() => handleDelete(item._id)}>Delete</button></td>
                            </tr>

                            )
                        }
                    </tbody>
                </table>

            </div>


        </div>
    );
};

export default MyProducts;