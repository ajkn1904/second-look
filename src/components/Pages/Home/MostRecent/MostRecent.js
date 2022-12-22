import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';

const MostRecent = () => {

    const { data = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch('https://second-look-server.vercel.app/products/recent');
            const data = await res.json();
            return data;
        }
    })


    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <>
        <p className='text-3xl text-center font-bold'>MOST RECENT</p>
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-12 md:gp-9 lg:gap-9 my-16 w-10/12 mx-auto'>
            {
                data.map(recent =>
                    
                    <div className="w-[90%] mx-auto bg-base-100 shadow-xl border-2" key={recent._id}>
                        <figure><img src={recent.image} alt="" className='w-[90%] h-[200px] mx-auto mt-4' /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{recent.name}</h2>
                            <p>{recent.description.slice(0,150)+'...'} 
                            <Link to={`/category/${recent.cat_id}`} className='text-primary'>Visit to buy</Link>
                            </p>
                        </div>
                    </div>
                )
            }

        </div>
        </>
    );
};

export default MostRecent;