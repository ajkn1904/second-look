import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import Navbar from '../Shared/Navbar/Navbar';
import { Toaster } from 'react-hot-toast';

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Toaster></Toaster>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;