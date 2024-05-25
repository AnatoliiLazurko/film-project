import React, { useContext } from 'react';
import useAuth from '../hooks/useAuth';
import { LoadingContext } from '../context/AuthContext';
//import Signin from '../components/Authorization/Login/Signin';
import { Navigate } from 'react-router-dom';

const GuestGuard = ({ children }) => {
    const { isAuth } = useAuth();
    const { status } = useContext(LoadingContext);

    if (status !== "loaded") return "Loading...";

    if (!isAuth && status === 'loaded') {
        return <Navigate to="/" />
    }

    return (
        <>
            { children }
        </>
    );
}

export default GuestGuard;
