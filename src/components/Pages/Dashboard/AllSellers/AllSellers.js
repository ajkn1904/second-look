import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast, Toaster } from 'react-hot-toast';

const AllSellers = () => {
    const [data, setData] = useState([]);
    const [reFetch, setReFetch] = useState(false);

    useEffect(() => {
        getSellers();
    }, [reFetch]);


    //using axios to get data from api
    const getSellers = () => {
        axios.get('http://localhost:5000/sellers')
            .then(res => {
                const sellers = res.data;
                setData(sellers)
            })
            .catch(error => console.log(error));
    }


    const handleDelete = (id) => {
        const doDelete = window.confirm('Do you want to delete this seller?');
        if(doDelete){
            fetch(`http://localhost:5000/sellers/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.deletedCount === 1){
                    setReFetch(!reFetch)
                   toast.error("Deleted Successfully")
                }
            })
        }
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
                                <td><button className='btn btn-warning btn-sm'>Verify</button></td>
                                <td><button className='btn btn-success btn-sm'>Make Admin</button></td>
                                <td><button className='btn btn-error btn-sm' onClick={() => handleDelete(seller._id)}>Delete</button></td>
                            </tr>

                            )
                        }
                    </tbody>
                </table>
                
            </div>
            <Toaster></Toaster>
        </div>
    );

}
export default AllSellers;