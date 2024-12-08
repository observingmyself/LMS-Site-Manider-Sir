import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="relative overflow-hidden">
      <main className="min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
