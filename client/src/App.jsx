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
import AdminLayout from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import PagesNotFound from "./pages/PagesNotFound";
import AuthCheck from "./auth/AuthCheck";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ScrollToTopButton from "./components/user/ScrollUp";
import AdminHomepage from "./components/admin/AdminHomepage";
import RegistrationForm from "./components/user/RegistrationForm";
import DisplayRegistration from "./pages/admin/DisplayRegistration";
import SinglePageLatestNews from "./components/user/SinglePageLatestNews";
import DisplayNews from "./pages/admin/DisplayNews";
import NewsAddForm from "./pages/admin/NewsAddForm";
import NewsUpdateForm from "./pages/admin/NewsUpdateForm";
import DisplayContact from "./pages/admin/DisplayContact";
import Blog from "./components/user/Blog";
import BlogSingle from "./components/user/BlogSingle";
import DisplayBlog from "./pages/admin/DisplayBlog";
import BlogAddForm from "./pages/admin/BlogAddForm";
import BlogUpdateForm from "./pages/admin/BlogUpdateForm";
import NewCourseAddForm from "./pages/admin/NewCourseAddForm";

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
            <Route path="news/:id" element={<SinglePageLatestNews/>} />
            <Route path="blog" element={<Blog/>} />
            <Route path="blog/:id" element={<BlogSingle/>} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="about" element={<About />} />
            <Route path="registration-form" element={<RegistrationForm/>} />
          </Route>

          {/* admin routes */}
          <Route
            path="/admin"
            element={
              <AuthCheck>
                <AdminLogin />
              </AuthCheck>
            }
          />

          {/* Admin Dashboard and Nested Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <AuthCheck>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </AuthCheck>
            }
          >
            {/* Nested Route for Homepage */}
            <Route path="registrations" element={<DisplayRegistration/>} />
            <Route path="add-course" element={<NewCourseAddForm/>} />
            <Route path="news" element={<DisplayNews/>} />
            <Route path="blog" element={<DisplayBlog/>} />
            <Route path="add-blog" element={<BlogAddForm/>} />
            <Route path="update-blog/:id" element={<BlogUpdateForm/>} />
            <Route path="news-form" element={<NewsAddForm/>} />
            <Route path="update-news/:id" element={<NewsUpdateForm/>} />
            <Route path="contact" element={<DisplayContact/>} />
          </Route>
          <Route path="*" element={<PagesNotFound />} />
        </Routes>
        <ScrollToTopButton />
      </div>
    </>
  );
}

export default App;
