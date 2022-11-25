import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../../Contexts/AuthProvider';
import LoadingSpinner from '../../../../Shared/LoadingSpinner/LoadingSpinner';
import BookingModal from './BookingModal';

const Products = () => {
    let { id } = useParams();
    const [booking, setBooking] = useState('')

    const { loading } = useContext(AuthContext)

    const { data = [], isLoading } = useQuery({
        queryKey: ['product'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/category/${id}`);
            const data = await res.json();
            return data;
        }
    })


    if (loading || isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }


    const handleBooking = (data) => {
        console.log(data)
        setBooking(data)
    }

    return (
        <div className='grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-12 sm:gap-12 md:gp-9 lg:gap-9 my-8'>
            {data &&
                data?.map(item => <div className="card w-[80%] mx-auto bg-base-100 md:card-side lg:card-side shadow-xl" key={item._id}>
                    <figure><img src={item.image} alt="book" className='w-60 h-full' /></figure>
                    <div className="card-body md:w-5/12 lg:w-8/12">
                        <h2 className="card-title">{item.name}</h2>
                        <h3 className="text-lg badge p-3">{item.cat_name}</h3>
                        <div>{item.description}</div>
                        <p>Original Price: <strong>${item.originalPrice}</strong></p>
                        <p>Resale Price: <strong>${item.resalePrice}</strong></p>
                        <p>Location:  <strong>{item.location}</strong></p>
                        <p>Used For: <strong>{item.used}</strong></p>
                        <p>Seller: <strong>{item.sellerName}</strong></p>
                        <small>Posted on: {item.postingTime}</small>

                        <div className="card-actions justify-end">
                            <label className='btn btn-primary bg-gradient-to-r from-primary to-secondary hover:from-blue-400 text-white' htmlFor="booking-modal" onClick={() => handleBooking(item._id)}>Book Now</label>
                        </div>
                    </div>
                </div>
                )}

                {
                    <BookingModal booking={booking}></BookingModal>
                }
                <Toaster></Toaster>
        </div>
    );
};

export default Products;