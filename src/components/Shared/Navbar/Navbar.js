import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../logo.svg'
import { AuthContext } from '../../Contexts/AuthProvider';

const Navbar = () => {

    const { user, userLogout } = useContext(AuthContext)

    //handling logout system
    const handleLogOut = () => {
        userLogout()
            .then(() => { })
            .cath(error => console.log(error))
    }

    const navMenu = <>

        <li><Link to='/' className='btn btn-ghost rounded font-semibold'>HOME</Link></li>
        <li><Link to='/blog' className='btn btn-ghost rounded font-semibold'>BLOG</Link></li>
        {
            // conditional rendering
            user?.uid ?
                <>
                    <li><Link to='/dashboard' className='btn btn-ghost rounded font-semibold'>DASHBOARD</Link></li>
                    <li><Link to='/' className='btn btn-ghost rounded font-semibold' onClick={handleLogOut}>LOGOUT</Link></li>
                </>
                :
                <>
                    <li><Link to='/login' className='btn btn-ghost rounded font-semibold'>LOGIN</Link></li>
                    <li><Link to='/register' className='btn btn-ghost rounded font-semibold'>REGISTER</Link></li>
                </>
        }

    </>



    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {
                            user?.uid &&

                            <p className="text-md font-bold italic text-center py-5 rounded-t-lg bg-gradient-to-r  from-success to-white">{user?.displayName}</p>
                        }
                        {navMenu}


                    </ul>
                </div>


                <img src={logo} alt="logo" className="w-14 h-14 rounded-full" />
                <Link to="/" className="mx-2 font-bold normal-case text-xl font-serif italic">SecondLook</Link>
            </div>


            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {navMenu}
                </ul>
            </div>
            <div className="navbar-end w-5/12">
                <p className="text-xl font-serif hidden sm:hidden md:hidden lg:block">{user?.displayName}</p>
            </div>

        </div>
    );
};

export default Navbar;