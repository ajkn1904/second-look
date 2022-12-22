import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast } from 'react-hot-toast';

const AllSellers = () => {
    const [data, setData] = useState([]);
    const [reFetch, setReFetch] = useState(false);

    useEffect(() => {
        getSellers();
    }, [reFetch]);


    //using axios to get data from api
    const getSellers = () => {
        axios.get('https://second-look-server.vercel.app/sellers')
            .then(res => {
                const sellers = res.data;
                setData(sellers)
            })
            .catch(error => console.log(error));
    }

    //deleting users from database
    const handleDelete = (id) => {
        const doDelete = window.confirm('Do you want to delete this seller?');
        if (doDelete) {
            fetch(`https://second-look-server.vercel.app/sellers/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount === 1) {
                        setReFetch(!reFetch)
                        toast.error("Deleted Successfully")
                    }
                })
        }
    }

    const handleVerify = id => {
        fetch(`https://second-look-server.vercel.app/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    setReFetch(!reFetch)
                    toast.success('Verification successful')
                }

            })
    }


    return (
        <div className='p-5 sm:p-5 md:p-8 lg:p-14 my-5'>
            <h2 className='text-2xl my-4 font-bold text-center'>ALL SELLERS</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Verify Seller</th>
                            <th>Make Admin</th>
                            <th>Delete</th>

                        </tr>
                    </thead>
                    <tbody>

                        {data &&
                            data?.map((seller, i) => <tr key={seller._id} className="hover">
                                <th>{[i + 1]}</th>
                                <td>{seller.name}</td>
                                <td>{seller.email}</td>
                                <td>
                                    {/* making the button invisible when the seller is verified */}
                                    {(seller?.verification !== true) &&
                                        <button className='btn btn-warning btn-sm' onClick={() => handleVerify(seller._id)}>Verify</button>
                                    }
                                </td>
                                <td><button className='btn btn-success btn-sm'>Make Admin</button></td>
                                <td><button className='btn btn-error btn-sm' onClick={() => handleDelete(seller._id)}>Delete</button></td>
                            </tr>

                            )
                        }
                    </tbody>
                </table>
            </div>
            
        </div>
    );

}
export default AllSellers;