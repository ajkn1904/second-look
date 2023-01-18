import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../../Contexts/AuthProvider';
import { Link } from 'react-router-dom';


const BookingModal = ({ booking, setBooking, refetch }) => {

    const { user } = useContext(AuthContext)
    const [bookingData, setBookingData] = useState([])


    useEffect(() => {
        fetch(`https://second-look-server.vercel.app/product/${booking}`)
            .then(res => res.json())
            .then(data => {
                //console.log(data)
                setBookingData(data)
            })
    }, [booking])


    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target;
        const userName = form.userName.value
        const userEmail = form.userEmail.value
        const userPhoneNumber = form.userPhoneNumber.value
        const userLocation = form.userLocation.value
        const price = form.price.value

        const itemName = bookingData.name;
        const itemId = booking
        const img = bookingData.image;



        const order = {
            userName, userEmail, userPhoneNumber, userLocation, itemName, itemId, img, price
        }

        //console.log(order)

        fetch('https://second-look-server.vercel.app/orders', {
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
                    setBooking(null)
                    toast.success('Booking Successful')
                    refetch()

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

                        <input type="text" name='userName' placeholder="Name" value={user?.displayName} className="input input-bordered w-full" disabled />

                        <input type="text" name='userEmail' defaultValue={user?.email} placeholder="Email" className="input input-bordered w-full" disabled />
                        <input type="text" name='price' defaultValue={bookingData.resalePrice} placeholder="Price" className="input input-bordered w-full" disabled />
                        <input type="text" name='userPhoneNumber' placeholder="Phone Number" className="input input-bordered w-full" required />
                        <input type="text" name='userLocation' placeholder="Your Location" className="input input-bordered w-full" required />

                        {
                            user?.uid ?
                                <input type="submit" className="btn btn-primary text-white" />
                                :
                                <p className='text-center text-xl'><Link to='/login' className='text-blue-600 font-semibold'>Login</Link> to order. </p>
                        }

                    </form>

                </div>
            </div>

        </div>
    );
};

export default BookingModal;