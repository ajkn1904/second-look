import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';

const CheckOutForm = ({ data }) => {

    const stripe = useStripe()
    const elements = useElements()
    const [cardError, setCardError] = useState('')
    const [success, setSuccess] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const [processing, setProcessing] = useState(false)
    const [clientSecret, setClientSecret] = useState('');

    const { _id, price, userName, userEmail } = data;


    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);



    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        setSuccess('')
        setProcessing(true)
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setCardError(error.message)
            console.log(error);
        }
        else {
            setCardError('')
        }


        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: userName,
                        email: userEmail
                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError.message);
            return
        }
        if (paymentIntent.status === 'succeeded') {

            const payment = {
                price,
                transactionId: paymentIntent.id,
                userEmail,
                orderId: _id
            }

            fetch('http://localhost:5000/payments', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.insertedId) {
                        setSuccess('Congrats! Payment Done');
                        setTransactionId(paymentIntent.id);

                    }
                })
        }
        setProcessing(false)
        console.log('paymentIntent', paymentIntent)
    };


    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" className='btn btn-primary btn-sm my-5' disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>

            {
                success &&
                <div>
                    <p className='text-success'>{success}</p>
                    <p>Your transaction id is <strong>{transactionId}</strong></p>
                </div>
            }
            <small className='text-error'>{cardError.message}</small>
        </>
    );
};

export default CheckOutForm;