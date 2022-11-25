import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'
import app from '../../Firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    //for creating new user with email and password
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    //for login with email and password
    const userLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    //for login or create new user with any provider like google, github or so on
    const continueWithProvider = (provider) => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    };

    //for update the user info on firebase 
    const userProfileUpdate = userInfo => {
        setLoading(true);
        return updateProfile(auth.currentUser, userInfo);
    };

    //for logout
    const userLogout = () => {
        setLoading(true);
        localStorage.removeItem('accessToken')
        return signOut(auth)
    }


    //useEffect for tracking a specific user for the site
    useEffect(() => {
        const unSubscriber = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => unSubscriber();
    }, [])



    const authInfo = {
        user,
        createUser,
        userLogin,
        continueWithProvider,
        userProfileUpdate,
        userLogout,
        loading

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;