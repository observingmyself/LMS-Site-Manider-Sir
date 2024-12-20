import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { Outlet, useLocation } from "react-router-dom";
import AdminHomepage from "../../components/admin/AdminHomepage";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(()=>{
    if(window.innerWidth < 1024){
      setIsSidebarOpen(false)
    }
  },[location])

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev); // Toggle sidebar visibility
  };

  return (
    <div className="relative">
      <AdminNavbar toggleSidebar={toggleSidebar} /> 
      <AdminSidebar isSidebarOpen={isSidebarOpen} />{" "}
      <div
        className={`absolute top-20 transition-all duration-300 ${
          isSidebarOpen ? "lg:w-5/6" : "lg:w-full"
        } h-full right-0`}
      >
        <AdminHomepage/>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
