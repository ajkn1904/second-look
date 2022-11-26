import { useQuery } from '@tanstack/react-query';
import React from 'react';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';
import AdvertisedItems from './AdvertisedItems/AdvertisedItems';
import Category from './Category/Category';

const Home = () => {

    //fetching advertised items
    const { data = [], isLoading } = useQuery({
        queryKey: ['advertisedProducts'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/advertisedProducts');
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <div>

            <Category></Category>

            {
                (data.length > 0) &&
                <AdvertisedItems ket={data._id} data={data}></AdvertisedItems>
            }

        </div>
    );
};

export default Home;