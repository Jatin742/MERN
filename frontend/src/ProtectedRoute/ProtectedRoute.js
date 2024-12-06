import React from 'react';
import {  Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../Components/Loader/Loader';

const ProtectedRoute = ({isAuthenticated,isAdmin,Component,children}) => {
    const {loading, user}=useSelector((state)=>state.user);
    const location=useLocation();
    if(loading===false){
        if(isAuthenticated===false || (isAdmin===true && user.role!=="admin")){
            return <Navigate to="/login" state={{from: location}} replace/>;
        }
        return children?children:<Component/>;
    }
    return <Loader/>;
}


export default ProtectedRoute