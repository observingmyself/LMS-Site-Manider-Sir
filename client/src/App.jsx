import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import About from "./pages/About";
import HeroSection from "./pages/HeroSection";
import ContactUs from "./components/user/ContactUs";
import AdminLayout from "./components/layout/Layout";
import AdminLogin from "./pages/admin/AdminLogin";
import PagesNotFound from "./pages/PagesNotFound";
import AuthCheck from "./auth/AuthCheck";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ScrollUp from "./components/user/ScrollUp";
import ScrollToTopButton from "./components/user/ScrollUp";
import AdminHomepage from "./components/admin/AdminHomepage";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <AuthCheck>
                <Layout />
              </AuthCheck>
            }
          >
            <Route path="" element={<HeroSection />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="about" element={<About />} />
            <Route path="" element={<ScrollUp />} />
          </Route>

          {/* admin routes */}
          <Route
            path="/admin"
            element={
              <AuthCheck>
                <AdminLayout />
              </AuthCheck>
            }
          >
            <Route path="" element={<AdminLogin />} />
            <Route path="dashboard" element={<AdminDashboard />} >
            <Route path="" element={<AdminHomepage/>} />
            </Route>
          </Route>
          <Route path="*" element={<PagesNotFound />} />
        </Routes>
        <ScrollToTopButton />
      </div>
    </>
  );
}

export default App;
