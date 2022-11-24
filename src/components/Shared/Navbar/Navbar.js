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

        <li><Link to='/' className='btn btn-ghost rounded font-semibold'>Home</Link></li>
        <li><Link to='/blog' className='btn btn-ghost rounded font-semibold'>Blog</Link></li>
        {
            // conditional rendering
            user?.uid ?
                <>
                    <li><Link to='/dashboard' className='btn btn-ghost rounded font-semibold'>Dashboard</Link></li>
                    <li><Link to='/' className='btn btn-ghost rounded font-semibold' onClick={handleLogOut}>Logout</Link></li>
                </>
                :
                <>
                    <li><Link to='/login' className='btn btn-ghost rounded font-semibold'>Login</Link></li>
                    <li><Link to='/register' className='btn btn-ghost rounded font-semibold'>Register</Link></li>
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
                        {navMenu}
                    </ul>
                </div>
                <img src={logo} alt="logo" className="w-14 h-14 rounded-full" />
                <div className=" mx-2 font-bold normal-case text-xl font-serif italic">SecondLook</div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {navMenu}
                </ul>
            </div>
            <div className="navbar-end mx-auto 3 w-5/12">
                <p className="text-xl font-serif">{user?.displayName}</p>
            </div>

            <label htmlFor="dashboard-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
            </label>

        </div>
    );
};

export default Navbar;