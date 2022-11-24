import React from 'react';

const CategoryCard = ({item}) => {
    return (
        <div className="card w-96 mx-auto shadow-xl bg-orange-100">
            <div className="card-body">
                <h2 className="card-title">{item.name}</h2>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;