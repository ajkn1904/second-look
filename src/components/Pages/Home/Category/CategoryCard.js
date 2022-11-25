import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({item}) => {
    return (
        <div className="card w-96 mx-auto shadow-xl bg-orange-100">
            <div className="card-body">
                <h2 className="card-title">{item.name}</h2>
                <div className="card-actions justify-end">
                <button className="btn btn-success my-8 mx-auto"><Link to={`/category/${item._id}`}>View Details</Link></button>
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;