import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';


const ProductsCard = ({ item, handleBooking, refetch }) => {

    const [sellerInfo, setSellerInfo] = useState({})


    useEffect(() => {
        fetch(`https://second-look-server.vercel.app/users/${item.sellerEmail}`)
            .then(res => res.json())
            .then(data => {
                setSellerInfo(data)
            })
    }, [item.sellerEmail])




    const handleReport = id => {
        const doReport = window.confirm('Do you want to report this product?');
        if (doReport) {
            fetch(`https://second-look-server.vercel.app/product/${id}`, {
                method: 'PUT'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.modifiedCount > 0) {
                       toast("Reported Successfully")
                        refetch()
                    }
                })
        }
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

                <div className="card-actions justify-between items-center">


                    <label className='btn btn-primary bg-gradient-to-r from-primary to-secondary hover:from-blue-400 text-white' htmlFor="booking-modal" onClick={() => handleBooking(item._id)}>Book Now</label>

                    <button className='btn btn-xs btn-ghost text-error' onClick={() => handleReport(item._id)}>
                        {item.reported === true ?
                            'Reported'
                            :
                            'Report to admin'
                        }
                    </button>

                </div>
            </div>
        </div>

    );
};

export default ProductsCard;