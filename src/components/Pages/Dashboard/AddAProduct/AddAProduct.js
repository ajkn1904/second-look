import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';

const AddAProduct = () => {

    const date = new Date();

    const { user } = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm()
    const navigate = useNavigate()
    const imgHostingKey = process.env.REACT_APP_imgbb_key;


    const { data: category = [], isLoading } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await fetch('https://second-look-server.vercel.app/category')
            const data = res.json()
            return data
        }
    })

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    const handleAddProduct = (data) => {

        const image = data.image[0]
        const formData = new FormData()
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?&key=${imgHostingKey}`

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    //console.log(imgData.data.url)

                    const product = {
                        cat_id: data.cat_id,
                        name: data.name,
                        image: imgData.data.url,
                        description: data.description,
                        location: data.location,
                        originalPrice: data.originalPrice,
                        resalePrice: data.resalePrice,
                        used: data.used,
                        sellerName: data.sellerName,
                        sellerEmail: data.sellerEmail,
                        conditionType: data.conditionType,
                        phone: data.phone,
                        postingTime: date.toDateString(),
                        purchaseYr: data.purchaseYr,
                        status: 'available',
                    }
                    //console.log(product)
                    fetch('https://second-look-server.vercel.app/product', {
                        method: 'POST',
                        headers: {
                            "content-type": "application/json",
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            toast.success('Your product added Successfully')
                            navigate('/dashboard/myProducts')
                        })
                }
            })


    }


    return (
        <>

            <h1 className='text-2xl font-bold text-center mt-10 mb-4'>ADD A PRODUCT</h1>
            <div className='flex justify-center items-center mb-20 p-4'>
                <div className='card shadow-xl w-8/12 bg-slate-100 p-7'>

                    <form onSubmit={handleSubmit(handleAddProduct)}>

                        <label className="label">
                            <span className="label-text">Name of the book</span>
                        </label>
                        <input type="text" className="w-full my-3 input input-bordered"  {...register("name")} />


                        <label className="label">
                            <span className="label-text">Select Category</span>
                        </label>
                        <select className="select select-bordered w-full"  {...register("cat_id")} >
                            {
                                category.map(item =>

                                    <option key={item._id} value={item._id}>{item.name}</option>

                                )
                            }
                        </select>


                        <label className="label">
                            <span className="label-text">Book's image</span>
                        </label>
                        <input type="file" className="file-input file-input-bordered w-full" {...register("image", {
                            required: 'Photo is required'
                        })}/>
                        

                        {errors.image && <p className='text-error'>{errors.image?.message}</p>}


                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <input type="text" className="w-full my-3 input input-bordered"  {...register("description")} />


                        <label className="label">
                            <span className="label-text">Location</span>
                        </label>
                        <input type="text" className="w-full my-3 input input-bordered"  {...register("location")} />


                        <label className="label">
                            <span className="label-text">Original Price</span>
                        </label>
                        <input type="text" className="w-full my-3 input input-bordered"  {...register("originalPrice")} />


                        <label className="label">
                            <span className="label-text">Resale Price</span>
                        </label>
                        <input type="text" className="w-full my-3 input input-bordered"  {...register("resalePrice")} />


                        <label className="label">
                            <span className="label-text">Year of purchase</span>
                        </label>
                        <input type="text" className="w-full my-3 input input-bordered"  {...register("purchaseYr")} />



                        <label className="label">
                            <span className="label-text">Years of Used</span>
                        </label>
                        <input type="text" className="w-full my-3 input input-bordered"  {...register("used")} />


                        <label className="label">
                            <span className="label-text">Condition type(excellent, good, fair)</span>
                        </label>
                        <input type="text" className="w-full my-3 input input-bordered"  {...register("conditionType")} />


                        <label className="label">
                            <span className="label-text">Phone Number</span>
                        </label>
                        <input type="text" className="w-full my-3 input input-bordered"  {...register("phone")} />


                        <label className="label">
                            <span className="label-text">Name of the seller</span>
                        </label>
                        <input type="text" className="w-full my-3 input input-bordered" defaultValue={user.displayName} readOnly {...register("sellerName")} />


                        <label className="label">
                            <span className="label-text">Email of the seller</span>
                        </label>
                        <input type="text" className="w-full my-3 input input-bordered" defaultValue={user.email}  {...register("sellerEmail")} readOnly />


                        <div className="flex flex-col w-full border-opacity-50">

                            <button className="w-full my-3 btn text-white" type="submit">Add Product</button>



                        </div>

                    </form>
                    
                </div>
                <Toaster></Toaster>

            </div>


        </>
    );
};

export default AddAProduct;