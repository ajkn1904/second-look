import { useEffect, useState } from 'react';

// hook for checking if the user is buyer
const useBuyer = (email) => {

    const [isBuyer, setIsBuyer] = useState(false)
    const [isBuyerLoading, setIsBuyerLoading] = useState(true)

    useEffect(() => {
        if(email){
            fetch(`https://second-look-server.vercel.app/users/buyers/${email}`)
            .then(res => res.json())
            .then(data => {
                setIsBuyer(data?.isBuyer)
                setIsBuyerLoading(false)
            })
        }
    }, [email])

    return [isBuyer, isBuyerLoading]
};

export default useBuyer;