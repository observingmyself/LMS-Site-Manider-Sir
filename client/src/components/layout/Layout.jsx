import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../user/Navbar";
import Footer from "../user/Footer";

const Layout = () => {
  return (
    <div className="relative overflow-hidden">
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
