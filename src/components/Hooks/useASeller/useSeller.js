import { useEffect, useState } from 'react';

// hook for checking if the user is seller
const useSeller = (email) => {
    const [isSeller, setIsSeller] = useState(false)
    const [isSellerLoading, setIsSellerLoading] = useState(true)

    useEffect(() => {
        if(email){
            fetch(`https://second-look-server.vercel.app/users/sellers/${email}`)
            .then(res => res.json())
            .then(data => {
                setIsSeller(data.isSeller)
                setIsSellerLoading(false)
            })
        }
    }, [email])
    return [isSeller, isSellerLoading]
};

export default useSeller;