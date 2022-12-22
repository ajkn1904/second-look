import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';

const ReportedItem = () => {

    //deleting reported item from database
    const handleDelete = id => {
        console.log(id)
        const doDelete = window.confirm('Do you want to delete this product?');
        if (doDelete) {
            fetch(`https://second-look-server.vercel.app/admin/products/${id}`, {
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

    //declining report
    const handleReportDecline = id => {
        fetch(`https://second-look-server.vercel.app/admin/product/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    toast.success('Declined Report successfully')
                    refetch()
                }

            })

    }


    const { data = [], isLoading, refetch } = useQuery({
        queryKey: ['reportedProducts'],
        queryFn: async () => {
            const res = await fetch('https://second-look-server.vercel.app/reportedProducts')
            const data = await res.json()
            return data
        }
    })


    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }



    return (
        <div className='p-5 sm:p-5 md:p-8 lg:p-14 my-5'>
            <h2 className='text-2xl my-4 font-bold text-center'>REPORTED ITEMS</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Item's Image</th>
                            <th>Item's Title</th>
                            <th>Seller's Email</th>
                            <th>Decline</th>
                            <th>DeLete</th>

                        </tr>
                    </thead>
                    <tbody>

                        {data &&
                            data?.map((reportedItem, i) => <tr key={reportedItem._id} className="hover">
                                <th>{[i + 1]}</th>
                                <td className="avatar">
                                    <div className="w-16 rounded">
                                        <img src={reportedItem.image} alt="" />
                                    </div>
                                </td>
                                <td>{reportedItem.name}</td>
                                <td>{reportedItem.sellerEmail}</td>
                                <td>
                                    <button className='btn btn-success btn-xs' onClick={() => handleReportDecline(reportedItem._id)}>Decline</button>
                                </td>
                                <td>
                                    <button className='btn btn-error btn-xs' onClick={() => handleDelete(reportedItem._id)}>Delete</button>
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

export default ReportedItem;