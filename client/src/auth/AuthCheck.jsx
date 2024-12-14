import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const AuthCheck = ({ isAuthenticated,user,children }) => {
  const location = useLocation();

    if(isAuthenticated && location.pathname.includes('/login') && user.role === 'student'){
        toast.success("You're already logged in!")
        return <Navigate to={"/"} />
    } 
    if(isAuthenticated && location.pathname.includes('/admin') && user.role === 'student'){
        toast.warn("can't access protected routes")
        return <Navigate to={"/"} />
    }
    if(!isAuthenticated && location.pathname.includes('dashboard')){
        return <Navigate to={"/login"} />
    }
    if(isAuthenticated && location.pathname.length < 7 && user.role === 'admin'){
        toast.success("You're already logged in!")
        return <Navigate to={"/admin/dashboard"} />
    }

  return <>{children}</>;
};

export default AuthCheck;
