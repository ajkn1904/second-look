import React, { useEffect, useState } from 'react';
import axios from "axios";

const AllSellers = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getSellers();
    }, []);
    //using axios to get data from api
    const getSellers = () => {
        axios.get('http://localhost:5000/sellers')
            .then(res => {
                const sellers = res.data;
                setData(sellers)
            })
            .catch(error => console.log(error));
    }
    return (
        <div className='p-5 sm:p-5 md:p-8 lg:p-14 my-5'>
            <h2 className='text-2xl my-4 font-bold text-center'>ALL Sellers</h2>
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
                                <td><button className='btn btn-success'>Pay</button></td>
                                <td><button className='btn btn-error'>Delete</button></td>
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