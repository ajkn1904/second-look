import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../../Contexts/AuthProvider';
import LoadingSpinner from '../../../../Shared/LoadingSpinner/LoadingSpinner';
import BookingModal from './BookingModal';
import ProductsCard from './ProductsCard';

const Products = () => {
    let { id } = useParams();
    const [booking, setBooking] = useState(null)

    const { loading } = useContext(AuthContext)

    const { data = [], isLoading, refetch } = useQuery({
        queryKey: ['product'],
        queryFn: async () => {
            const res = await fetch(`https://second-look-server.vercel.app/category/${id}`);
            const data = await res.json();
            return data;
        }
    })


    if (loading || isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }


    const handleBooking = (data) => {
        setBooking(data)
    }

    return (
        <div className='grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-12 sm:gap-12 md:gp-9 lg:gap-9 my-24'>
            {data &&
                data?.map(item => <ProductsCard key={item._id} item={item} handleBooking={handleBooking} refetch={refetch}></ProductsCard>)
            }
            { booking &&
                <BookingModal setBooking={setBooking} refetch={refetch} booking={booking}></BookingModal>
            }
           
        </div>
    );
};

export default Products;