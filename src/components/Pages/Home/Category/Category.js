import { useQuery } from '@tanstack/react-query';
import React from 'react';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';
import CategoryCard from './CategoryCard';

const Category = () => {
    
    const {data: categories = [], isLoading } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await fetch('https://second-look-server.vercel.app/category');
            const data = await res.json();
            return data;
        }
    })
    
    
        if (isLoading) {
            return <LoadingSpinner></LoadingSpinner>
        }
    


    return (
        <div className='my-24'>

            <h2 className='text-3xl font-bold text-center my-16'>BOOKS CATEGORY</h2>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-12 md:gp-9 lg:gap-9 my-8'>
                { categories && 
                    categories?.map(item => <CategoryCard item={item} key={item._id}></CategoryCard>)
                }
            </div>
            
        </div>
    );
};

export default Category;