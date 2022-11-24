import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';

const Login = () => {

    const [loginError, setLoginError] = useState('');
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { userLogin, continueWithProvider, loading } = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider()
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathName || '/'


    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    const handleLogin = (data) => {
        userLogin(data.email, data.password)
        .then(res => {
            const user = res.user
            console.log(user);
            setLoginError('')
            navigate(from, {replace: true})
            })
            .catch(error => setLoginError(error.message))
    }


    const handleGoogleLogin = () => {
        continueWithProvider(googleProvider)
        .then(res => {
            const user = res.user;
            console.log(user);
            navigate(from, {replace: true})
        })
        .catch(error => setLoginError(error.message))
    }



    return (
        <div className='flex justify-center items-center my-20 p-4'>
            <div className='card shadow-xl w-96 p-7'>
                <h1 className='text-xl font-bold text-center my-10'>Login Now</h1>

                <form onSubmit={handleSubmit(handleLogin)}>



                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" className="w-full my-3 input input-bordered"  {...register("email", { required: "Email is required" })} />

                    {errors.email && <p className='text-error'>{errors.email?.message}</p>}



                    <label>
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" className="w-full my-3 input input-bordered"  {...register("password",
                        {
                            required: "Password is required"
                        })} />

                    {errors.password && <p className='text-error'>{errors.password?.message}</p>}



                    <small className='text-red-600'>{loginError}</small>



                    <div className="flex flex-col w-full border-opacity-50">

                        <button className="w-full my-3 btn text-white" type="submit">Login</button>
                        <small>Have no account? <Link to="/register" className='text-primary'>Register now</Link></small>

                        <div className="divider">OR</div>

                        <button onClick={handleGoogleLogin} className="w-full my-3 btn btn-outline btn-primary" type="submit">CONTINUE WITH GOOGLE</button>

                    </div>

                </form>

            </div>
            <Toaster></Toaster>
        </div>
    );
};

export default Login;