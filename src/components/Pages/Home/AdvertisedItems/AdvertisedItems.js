import React from 'react';

const AdvertisedItems = ({ data }) => {

    return (
        <div className='my-24'>
            <h2 className='text-3xl font-bold text-center my-16'>ADVERTISED ITEMS</h2>
            <div className="carousel carousel-center w-10/12 mx-auto p-8 space-x-12 bg-gray-600 rounded-box border-4 border-yellow-500">

                {
                    data.map(item => 
                        <div key={item._id}>
                        {item.advertise === true &&

                        <div className="carousel-item">
                            <div className="indicator">
                                <span className="indicator-item indicator-top indicator-end badge badge-warning font-semibold italic p-4 text-xl">${item.resalePrice}</span>
                                <img src={item.image} className="rounded-box" alt="" style={{ height: '400px', width: '260px' }} />
                            </div>


                        </div>
                    }
                    </div>
                    )
                }

            </div>
        </div>
    );
};

export default AdvertisedItems;