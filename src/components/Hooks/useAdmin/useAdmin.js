import { useEffect, useState } from 'react';

// hook for checking if the user is admin
const useAdmin = (email) => {
 
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);

    useEffect(() => {
        if(email){
            fetch(`https://second-look-server.vercel.app/users/admin/${email}`)
            .then(res => res.json())
            .then(data => { 
                setIsAdmin(data.isAdmin)
                setIsAdminLoading(false)
            })
        }
    }, [email])

    return [isAdmin, isAdminLoading]
};

export default useAdmin;