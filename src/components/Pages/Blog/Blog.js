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
                    <p>There are at least seven ways to handle the state in React apps. Some are given here.
                        1. We can use URL to store some data. For example: the id of the current item, being viewed, filter parameters etc. Keeping such data in the URL allows users to share deep links with others.
                        2. Store the state in the browser via web storage. This is useful when we want to persist state between reloads and reboots. Examples include cookies, local storage, and IndexedDB.
                        3. Use store state locally. It is useful when one component needs the state. Examples include a toggle button, a form, etc.
                        4. Define the state in the parent component. Often, the same state is used across multiple components. In those cases, it is useful to lift the state to a common parent.
                        5. Compute the new state based on the available state and we do not need to declare a state at all. If there are existing values that can be composed to give us the information we need, then we can calculate that information on each render instead of storing it. For example: .length, numItems, errorsExist etc.</p>
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
                    <p>The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. The prototype is itself an object, so the prototype will have its own prototype, making what's called a prototype chain. The chain ends when we reach a prototype that has null for its own prototype.
                        N.B. The property of an object that points to its prototype, is not called prototype .</p>
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
                    <p>A unit test is a way of testing a unit - the smallest piece of code that can be logically isolated in a system.
                    when we write test we take the perspective of the one that will consume our code. It forces to have an holistic approach of the behavior to implement. This way ambiguities we get from requirements become obvious and are immediately taken account when code is written the first time. It involves testing individual components of the software program or application. The main purpose behind this is to check that all the individual parts are working as intended.
                    </p>
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
                    <p>React is a UI library, Angular is a fully-fledged front-end framework, while Vue.js is a progressive framework. Again, React and Vue.js are mainly declarative, and while Angular could also be declarative, it's really more imperative.</p>
                </div>
            </div>


        </div>
    );
};

export default Blog;