import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../../Contexts/AuthProvider';

const BookingModal = ({ booking }) => {
    console.log(booking)
    const { user } = useContext(AuthContext)
    const [bookingData, setBookingData] = useState([])
    //const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`http://localhost:5000/product/${booking}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setBookingData(data)
            })
    }, [booking])

    /*     const { data:bookingData = [], isLoading } = useQuery({
            queryKey: ['booking'],
            queryFn: async () => {
                const res = await fetch(`http://localhost:5000/product/${booking}`);
                const data = await res.json();
                return data;
            }
        }) */

    /*     if(loading){
            return <LoadingSpinner></LoadingSpinner>
        } */

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target;
        const userName = form.userName.value
        const userEmail = form.userEmail.value
        const userPhoneNumber = form.userPhoneNumber.value
        const userLocation = form.userLocation.value
        const price = form.price.value

        const itemName = bookingData.name;
        const img = bookingData.image;



        const order = {
            userName, userEmail, userPhoneNumber, userLocation, itemName, img, price
        }

        console.log(order)

        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {

                    toast.success('Booking Successful')

                }
                else {
                    toast.error(data.response)
                }
            })

    }

    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold" name="itemName" value={bookingData.name}>{bookingData.name}</h3>

                    <form onSubmit={handleSubmit} className='flex flex-col justify-center gap-5 my-10'>

                        <input type="text" name='userName' placeholder="Type here" value={user.displayName} className="input input-bordered w-full" disabled />

                        <input type="text" name='userEmail' defaultValue={user.email} placeholder="Full Name" className="input input-bordered w-full" disabled />
                        <input type="text" name='price' defaultValue={bookingData.resalePrice} placeholder="Phone Number" className="input input-bordered w-full" disabled />
                        <input type="text" name='userPhoneNumber' placeholder="Phone Number" className="input input-bordered w-full" required />
                        <input type="text" name='userLocation' placeholder="Your Location" className="input input-bordered w-full" required />


                        <input type="submit" className="btn btn-primary text-white" />

                    </form>

                </div>
            </div>

        </div>
    );
};

export default BookingModal;