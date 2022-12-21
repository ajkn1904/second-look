import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';

//Footer

const Footer = () => {
    return (
        <footer className="footer footer-center p-10 bg-gray-800 text-white w-full">
            <div className="grid grid-flow-col gap-4">
                <Link to='/' className="link link-hover">About us</Link>
                <Link to='/' className="link link-hover">Contact</Link>
                <Link to='/' className="link link-hover">Privacy & Policy</Link>
            </div>
            <div className="grid grid-flow-col gap-4">
                <a href='https://www.linkedin.com/' target='_blank' rel='noreferrer'><FaLinkedin className='w-6 h-6' /></a>

                <a href='https://twitter.com/' target='_blank' rel="noreferrer"><FaTwitter className='w-6 h-6' /></a>

                <a href='https://www.facebook.com/' target='_blank' rel='noreferrer'><FaFacebookF className='w-6 h-6' /></a>
            </div>
            <div>
                <small>© 2022 || Anika Jumana Khanam</small>
            </div>

        </footer>
    );
};

export default Footer;
