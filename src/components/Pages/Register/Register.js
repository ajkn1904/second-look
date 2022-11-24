import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import useToken from '../../Hooks/useToken/useToken';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';

const Register = () => {

    const { createUser, continueWithProvider,
        userProfileUpdate, loading } = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit } = useForm()
    const [registerError, setRegisterError] = useState('')

    const googleProvider = new GoogleAuthProvider();
    const navigate = useNavigate()
    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [token] = useToken(createdUserEmail)

 /*    useEffect(() => {
        if (token) {
            navigate('/')
        }
    },[token, navigate]) */


    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }


    const storeUser = (name, email, role) => {
        const user = {
            name,
            email,
            role
        }
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                navigate('/')
                setCreatedUserEmail(email);
            })
    }
    const handleProfile = (data) => {
        const userInfo = {
            displayName: data.name
        }

        userProfileUpdate(userInfo)
            .then(() => {
                storeUser(data.name, data.email, data.role)
            })
            .catch((error) => setRegisterError(error.message))
    }


    const handleRegister = data => {
        if (data.password !== data.confirmPassword) {
            setRegisterError('Your password did not match.')
            return setRegisterError;
        }

        setRegisterError('')
        createUser(data.email, data.password)
            .then(res => {
                const user = res.user
                console.log(user)
                toast.success('Registration Successful')
                handleProfile(data)
            }
            )

            .catch(error => setRegisterError(error.message))

    }




    const handleGoogleLogin = () => {

        continueWithProvider(googleProvider)
            .then(res => {
                const user = res.user
                storeUser(user.displayName, user.email, 'Buyer')
            })
            .catch((error) => setRegisterError(error.message))
    }



    return (
        <div className='flex justify-center items-center my-20 p-4'>
            <div className='card shadow-xl w-96 p-7'>
                <h1 className='text-xl font-bold text-center my-10'>Register Now</h1>

                <form onSubmit={handleSubmit(handleRegister)}>

                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" className="w-full my-3 input input-bordered"  {...register("name")} />



                    <label className="label">
                        <span className="label-text">Select Account Type</span>
                    </label>
                    <select className="select select-bordered w-full max-w-xs"  {...register("role")} >
                        <option value={'Buyer'} default>Normal User</option>
                        <option value={'Seller'}>Seller</option>
                    </select>




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
                            required: "Password is required",
                            minLength: { value: 6, message: 'Password must be at least 6 character long' },
                            pattern: {
                                value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                                message: 'Password must contain at least an uppercase, a special character and a number.'
                            }
                        })} />

                    {errors.password && <p className='text-error'>{errors.password?.message}</p>}



                    <label>
                        <span className="label-text">Re-type Password</span>
                    </label>
                    <input type="password" className="w-full my-3 input input-bordered"  {...register("confirmPassword",
                        {
                            required: "Password is required",
                            minLength: { value: 6, message: 'Password must be at least 6 character long' }
                        })} />

                    {errors.confirmPassword && <p className='text-error'>{errors.confirmPassword?.message}</p>}



                    <label className="label">
                        <span className="label-text">Forget Password?</span>
                    </label>
                    <small className='text-red-600'>{registerError}</small>



                    <div className="flex flex-col w-full border-opacity-50">

                        <button className="w-full my-3 btn text-white" type="submit">Register</button>
                        <small>Already have an account? <Link to="/login" className='text-primary'>Login now</Link></small>

                        <div className="divider">OR</div>

                        <button onClick={handleGoogleLogin} className="w-full my-3 btn btn-outline btn-primary" type="submit">CONTINUE WITH GOOGLE</button>

                    </div>

                </form>

            </div>
            <Toaster></Toaster>
        </div>
    );
};

export default Register;