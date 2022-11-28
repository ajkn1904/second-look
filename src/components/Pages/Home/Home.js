import { useQuery } from '@tanstack/react-query';
import React from 'react';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';
import AdvertisedItems from './AdvertisedItems/AdvertisedItems';
import Category from './Category/Category';
import MostRecent from './MostRecent/MostRecent';

const Home = () => {

    //fetching advertised items
    const { data = [], isLoading } = useQuery({
        queryKey: ['advertisedProducts'],
        queryFn: async () => {
            const res = await fetch('https://second-look-server.vercel.app/advertisedProducts');
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <div>
            <section className="hero h-[400px]" style={{ backgroundImage: `url('https://i.ibb.co/yspT48x/shiromani-kant-mo3-FOTG62ao-unsplash.jpg')` }}>
                <div className="hero-overlay bg-opacity-70"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-lg">
                        <h1 className="mb-5 text-5xl font-bold font-serif border-2 px-8">SECOND LOOK</h1>
                        <p className="mb-5 p-5 bg-gray-700">“Used books,” as if someone else has had the best of them and you get the sere husk, or the lees, as if a book isn’t the one thing, the one product, that is forever new. There’s no such thing as a used book. Or there’s no such thing as a book if it’s not being used.”</p>

                    </div>
                </div>
            </section>

            <Category></Category>

            {
                (data.length > 0) &&
                <AdvertisedItems ket={data._id} data={data}></AdvertisedItems>
            }


            <div className='my-16'>
                <MostRecent></MostRecent>
            </div>

        </div>
    );
};

export default Home;