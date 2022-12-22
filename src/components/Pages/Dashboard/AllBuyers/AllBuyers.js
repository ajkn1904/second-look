import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast, Toaster } from 'react-hot-toast';

const AllBuyers = () => {
    const [data, setData] = useState([]);
    const [reFetch, setReFetch] = useState(false);


    //using axios to get data from api
    useEffect(() => {
        axios.get('https://second-look-server.vercel.app/buyers')
            .then(res => {
                const buyers = res.data;
                setData(buyers)
            })
            .catch(error => console.log(error));
    }, [reFetch]);


    //deleting users from database
    const handleDelete = (id) => {
        const doDelete = window.confirm('Do you want to delete this buyer?');
        if (doDelete) {
            fetch(`https://second-look-server.vercel.app/buyers/${id}`, {
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


    return (
        <div className='p-5 sm:p-5 md:p-8 lg:p-14 my-5'>
            <h2 className='text-2xl my-4 font-bold text-center'>ALL BUYERS</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Make Admin</th>
                            <th>Delete</th>

                        </tr>
                    </thead>
                    <tbody>

                        {data &&
                            data?.map((buyer, i) => <tr key={buyer._id} className="hover">
                                <th>{[i + 1]}</th>
                                <td>{buyer.name}</td>
                                <td>{buyer.email}</td>
                                <td><button className='btn btn-success btn-sm'>Make Admin</button></td>
                                <td><button className='btn btn-error btn-sm' onClick={() => handleDelete(buyer._id)}>Delete</button></td>
                            </tr>

                            )
                        }
                    </tbody>
                </table>
            </div>
          
        </div>
    );

}
export default AllBuyers;