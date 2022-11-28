import React, { useContext } from 'react';
import { Link, useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';

const ErrorPage = () => {
    const error = useRouteError()
    const { userLogout } = useContext(AuthContext)
    const navigate = useNavigate()


    //handling logout system
    const handleLogOut = () => {
        userLogout()
            .then(() => { navigate('/login') })
            .cath(error => console.log(error))
    }

    
    return (
        <div className='flex flex-col justify-center items-center my-96'>
            <p className='text-3xl font font-semibold'>Something went wrong</p>
            <p className='text-red-500'>{error.statusText || error.message}</p>
            <h4 className='text-2xl'>Please <button><Link to='/' className='btn btn-ghost rounded font-semibold' onClick={handleLogOut}>LOGOUT</Link></button> and try again</h4>
        </div>
    );
};

export default ErrorPage;