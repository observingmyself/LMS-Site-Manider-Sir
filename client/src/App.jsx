import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import About from "./pages/About";
import HeroSection from "./pages/HeroSection";
import OurVideoShorts from "./pages/OurVideoShorts";
import Carousel from "./pages/Carousel";
import NumberingCounter from "./components/user/NumberingCounter";
import Banner from "./components/user/Banner";
import ContactUs from "./components/user/ContactUs";

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
          <Route path="/" element={<Layout />}>
            <Route path="" element={<HeroSection />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="contactus" element={<ContactUs/>} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
