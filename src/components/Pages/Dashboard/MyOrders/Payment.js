import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';
import CheckOutForm from './CheckOutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK)

const Payment = () => {
    const { id } = useParams()


    const { data = [], isLoading, refetch } = useQuery({
        queryKey: ['orders', id],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/orders/${id}`)
            const data = await res.json()
            return data
        }
    })
    console.log(data)

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div>
            <h2 className='text-2xl my-4 font-bold text-center'>Payment for “{data.itemName
            }”</h2>
            <p className='text-center'>Please pay <strong>${data.price}</strong></p>


            <div className='w-96 my-8'>
                <Elements stripe={stripePromise}>
                    <CheckOutForm
                        data={data} />
                </Elements>
            </div>

        </div>
    );
};

export default Payment;