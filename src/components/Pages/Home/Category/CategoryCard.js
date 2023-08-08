import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ item }) => {
    return (
        <div className='w-[80%] mx-auto hover:shadow-lg hover:shadow-green-700 rounded-2xl'>
            <Link to={`/category/${item._id}`} className={`card h-56 bg-cover bg-slate-900`} style={{
            backgroundImage: `url(${item.cat_img})`,
        }}>
            <div className="card-body">
                <h2 className="card-title bg-slate-900 text-white p-1 uppercase">{item.name}</h2>
                <div className="card-actions justify-end">
                </div>
            </div>
            <button className="my-2 mx-auto text-white"><Link to={`/category/${item._id}`}>Click to View</Link></button>
        </Link>
        </div>
    );
};

export default CategoryCard;