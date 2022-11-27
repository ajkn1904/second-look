import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../../../Shared/LoadingSpinner/LoadingSpinner';

const ProductsCard = ({ item, handleBooking }) => {

    const [sellerInfo, setSellerInfo] = useState({})
    const [loading, setLoading] = useState(true)

    
    useEffect(() => {
        fetch(`http://localhost:5000/users/${item.sellerEmail}`)
            .then(res => res.json())
            .then(data => {
                setSellerInfo(data)
                setLoading(false)
            })
    }, [item.sellerEmail])


    if(loading){
        return <LoadingSpinner></LoadingSpinner>
    }



    return (
        <div className="card w-[80%] mx-auto bg-base-100 md:card-side lg:card-side shadow-xl" key={item._id}>
            <figure><img src={item.image} alt="book" className='w-60 h-full' /></figure>
            <div className="card-body md:w-5/12 lg:w-8/12">
                <h2 className="card-title">{item.name}</h2>
                <h3 className="text-lg badge p-3">{item.cat_name}</h3>
                <div>{item.description}</div>
                <p>Original Price: <strong>${item.originalPrice}</strong></p>
                <p>Resale Price: <strong>${item.resalePrice}</strong></p>
                <p>Location:  <strong>{item.location}</strong></p>
                <p>Used For: <strong>{item.used}</strong></p>
                <div className='flex gap-4'>
                    <span>Seller: <strong>{item.sellerName}</strong></span>
                    {
                        (sellerInfo.verification) &&
                        <input className='w-4 rounded-full' type="checkbox" checked readOnly />
                    }
                </div>
                <small>Posted on: {item.postingTime}</small>

                <div className="card-actions justify-end">
                    <label className='btn btn-primary bg-gradient-to-r from-primary to-secondary hover:from-blue-400 text-white' htmlFor="booking-modal" onClick={() => handleBooking(item._id)}>Book Now</label>
                </div>
            </div>
        </div>

    );
};

export default ProductsCard;