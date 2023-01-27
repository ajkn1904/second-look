import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({item}) => {
    return (
        <div className={`card w-[80%] mx-auto shadow-xl {
            ${item.name === "Story"} && bg-[url('https://i.ibb.co/y4fr6n2/1000-F-556497357-IHrxvr6-A648b-QUTnlm-Zd-NQi-SPj95tp5y.jpg')]
        }`}>
            <div className="card-body">
                <h2 className="card-title text-white">{item.name}</h2>
                <div className="card-actions justify-end">
                <button className="btn btn-success my-8 mx-auto"><Link to={`/category/${item._id}`}>View Details</Link></button>
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;