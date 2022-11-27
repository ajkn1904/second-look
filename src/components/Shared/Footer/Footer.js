import React from 'react';
import { Link } from 'react-router-dom';

//Footer

const Footer = () => {
    return (
        <footer className="footer footer-center p-10 bg-gray-800 text-white w-full">
                <div className="grid grid-flow-col gap-4">
                    <Link to='/' className="link link-hover">About us</Link> 
                    <Link to='/' className="link link-hover">Contact</Link> 
                    <Link to='/' className="link link-hover">Privacy & Policy</Link> 
                </div> 

                <div>
                    <small>© 2022 || Anika Jumana Khanam</small>
                </div>

        </footer>
    );
};

export default Footer;
