import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const AuthCheck = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const location = useLocation();

    if(token && location.pathname.includes('/login') && token.role === 'student'){
        toast.success("You're already logged in!")
        return <Navigate to={"/"} />
    } 
    if(token && location.pathname.includes('/admin') && token.role === 'student'){
        toast.warn("can't access protected routes")
        return <Navigate to={"/"} />
    }
    if(!token && location.pathname.includes('dashboard')){
        toast.warn("Please Login to access this page")
        return <Navigate to={"/admin"} />
    }
    if(token && location.pathname.length < 7 && token.role === 'admin'){
        toast.success("You're already logged in!")
        return <Navigate to={"/admin/dashboard"} />
    }

  return <>{children}</>;
};

export default AuthCheck;
