import React from 'react';

const Blog = () => {
    return (
        <div>
            <h2 className='text-3xl text-center font-semibold my-10'>READ OUR BLOG</h2>
            
            
            <div className="collapse border-2 rounded-xl border-gray-400 my-10 w-8/12 mx-auto">
                <input type="checkbox" className="peer" />
                <div className="collapse-title font-bold bg-green-50 peer-checked:bg-gray-200 peer-checked:text-black-content">
                    <p>
                        1. What are the different ways to manage a state in a React application?
                    </p>
                    <div className='flex justify-end'>
                    <small className='badge p-3'>Continue reading</small>
                    </div>
                </div>
                <div className="collapse-content text-black-content peer-checked:bg-white peer-checked:text-black-content">
                    <p>hello</p>
                </div>
            </div>

            
            
            
            <div className="collapse border-2 rounded-xl border-gray-400 my-10 w-8/12 mx-auto">
                <input type="checkbox" className="peer" />
                <div className="collapse-title font-bold bg-green-50 peer-checked:bg-gray-200 peer-checked:text-black-content">
                    <p>
                    2. How does prototypical inheritance work?
                    </p>
                    <div className='flex justify-end'>
                    <small className='badge p-3'>Continue reading</small>
                    </div>
                </div>
                <div className="collapse-content text-black-content peer-checked:bg-white peer-checked:text-black-content">
                    <p>hello</p>
                </div>
            </div>

            
            
            <div className="collapse border-2 rounded-xl border-gray-400 my-10 w-8/12 mx-auto">
                <input type="checkbox" className="peer" />
                <div className="collapse-title font-bold bg-green-50 peer-checked:bg-gray-200 peer-checked:text-black-content">
                    <p>
                    3. What is a unit test? Why should we write unit tests?
                    </p>
                    <div className='flex justify-end'>
                    <small className='badge p-3'>Continue reading</small>
                    </div>
                </div>
                <div className="collapse-content text-black-content peer-checked:bg-white peer-checked:text-black-content">
                    <p>hello</p>
                </div>
            </div>

            
            
            <div className="collapse border-2 rounded-xl border-gray-400 my-10 w-8/12 mx-auto">
                <input type="checkbox" className="peer" />
                <div className="collapse-title font-bold bg-green-50 peer-checked:bg-gray-200 peer-checked:text-black-content">
                    <p>
                    4. React vs. Angular vs. Vue?
                    </p>
                    <div className='flex justify-end'>
                    <small className='badge p-3'>Continue reading</small>
                    </div>
                </div>
                <div className="collapse-content text-black-content peer-checked:bg-white peer-checked:text-black-content">
                    <p>hello</p>
                </div>
            </div>


        </div>
    );
};

export default Blog;