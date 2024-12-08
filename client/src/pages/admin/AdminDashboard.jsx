import React, { useState } from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
