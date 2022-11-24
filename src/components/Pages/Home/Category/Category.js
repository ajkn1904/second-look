import { useQuery } from '@tanstack/react-query';
import React from 'react';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';
import CategoryCard from './CategoryCard';

const Category = () => {

    const { data: category = [], isLoading } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/category');
            const data = await res.json();
            return data;
        }
    })


    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }


    return (
        <div className='my-10'>

            <h2 className='text-xl font-bold text-center'>BOOKS CATEGORY</h2>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-12 md:gp-9 lg:gap-9 my-8'>
                {
                    category.map(item => <CategoryCard item={item} key={item._id}></CategoryCard>)
                }
            </div>
        </div>
    );
};

export default Category;