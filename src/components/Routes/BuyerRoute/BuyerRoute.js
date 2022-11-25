import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import useBuyer from '../../Hooks/useBuyer/useBuyer';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';

const BuyerRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation()
    const [isBuyer, isBuyerLoading] = useBuyer(user?.email)

    if(loading || isBuyerLoading){
        return <LoadingSpinner></LoadingSpinner>
    }

    if (user && isBuyer) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default BuyerRoute;