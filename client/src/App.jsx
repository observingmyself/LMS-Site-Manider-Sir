import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import { GoogleOAuthProvider } from "@react-oauth/google";
import DisplayTeamMember from "./pages/admin/DisplayTeamMember";
import UpdateTeamMemberForm from "./pages/admin/UpdateTeamMemberForm";
import TeamMemberAddForm from "./pages/admin/TeamMemberAddForm";
import CheckoutPayment from "./components/payment/Checkout";
import CourseDetail from "./pages/CourseDetail";
import CoursePage from "./pages/CoursePage";
import DisplayRegisterUser from "./pages/admin/DisplayRegisterUser";
import ForgetPasswordPage from "./components/user/ForgetPasswordPage";
import ResetPassword from "./components/user/ResetPassword";
import CourseDashboard from "./pages/admin/CourseDashboard";
import UpdateCourse from "./pages/admin/UpdateCourse";
import UploadCertificate from "./pages/admin/UploadCertificate";
import ViewCertificates from "./pages/admin/ViewCertificates";
import EditCertificate from "./pages/admin/EditCertificate";
import PurchasedTransaction from "./pages/admin/PurchasedTransaction";
import Profile from "./pages/Profile";
import ChangePasswordPage from "./pages/ChaangePasswordPage";
import AddSyllabus from "./pages/admin/coursefiles/AddSyllabus";
import AddEbook from "./pages/admin/coursefiles/AddEbook";
import AddPPT from "./pages/admin/coursefiles/AddPPT";
import CertificateAuthentication from "./pages/CertificateAuthentication";
import MyLearningPage from "./pages/MyLearningPage";
import EditProfilePage from "./pages/EditProfilePage";
import ShipingAndDelivery from "./pages/ShipingAndDelivery";
import Terms_Cond from "./pages/Terms_Cond";
import CancellationPolicy from "./pages/CancellationPolicy";
import Privacy from "./pages/Privacy";
import DisplayReview from "./pages/admin/DisplayReview";
import CreateNewAdmin from "./pages/admin/CreateNewAdmin";
function App() {
  const { isAuthenticated, user, token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth(token));
  }, [dispatch]);

  const GoogleAuthWrapper = () => {
    const clientid = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    // console.log(clientid);
    return (
      <GoogleOAuthProvider clientId={clientid}>
        <Login></Login>
      </GoogleOAuthProvider>
    );
  };
  return (
    <>
      <ToastContainer
        position="bottom-right"
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
              <AuthCheck isAuthenticated={isAuthenticated} user={user}>
                <Layout />
              </AuthCheck>
            }
          >
            <Route path="" element={<HeroSection />} />
            <Route path="login" element={<GoogleAuthWrapper />} />
            <Route path="forget-password" element={<ForgetPasswordPage />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
            <Route path="register" element={<Register />} />
            <Route path="news/:id" element={<SinglePageLatestNews />} />
            <Route path="blog" element={<Blog />} />
            <Route path="shipping" element={<ShipingAndDelivery />} />
            <Route path="TermandCondition" element={<Terms_Cond />} />
            <Route path="refund" element={<CancellationPolicy />} />
            <Route path="PrivacyPolicy" element={<Privacy />} />
            <Route
              path="certificate-authentication"
              element={<CertificateAuthentication />}
            />
            <Route path="blog/:id" element={<BlogSingle />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="courses" element={<CoursePage />} />
            <Route path="course-detail/:id" element={<CourseDetail />} />
            <Route path="about" element={<About />} />
            <Route path="registration-form" element={<RegistrationForm />} />
            <Route path="payment" element={<CheckoutPayment />} />
            <Route path="profile" element={<Profile />} />
            <Route path="edit-profile/:id" element={<EditProfilePage />} />
            <Route path="change-password" element={<ChangePasswordPage />} />
            <Route path="myLearning" element={<MyLearningPage />} />
          </Route>

          {/* Admin Dashboard and Nested Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <AuthCheck isAuthenticated={isAuthenticated} user={user}>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </AuthCheck>
            }
          >
            {/* Nested Route for Homepage */}

            {/* Registration Routes */}
            <Route path="registrations" element={<DisplayRegistration />} />

            {/* News Routes */}
            <Route path="news" element={<DisplayNews />} />
            <Route path="news-form" element={<NewsAddForm />} />
            <Route path="update-news/:id" element={<NewsUpdateForm />} />

            {/* review routes */}
            <Route path="review" element={<DisplayReview/>} />

            {/* add admin */}
            <Route path="create-admin" element={<CreateNewAdmin/>} />

            {/* Blog Routes */}
            <Route path="blog" element={<DisplayBlog />} />
            <Route path="add-blog" element={<BlogAddForm />} />
            <Route path="update-blog/:id" element={<BlogUpdateForm />} />

            {/* Team members routes */}
            <Route path="add-member" element={<TeamMemberAddForm />} />
            <Route path="team-members" element={<DisplayTeamMember />} />
            <Route path="updateTeam/:id" element={<UpdateTeamMemberForm />} />

            {/* contact query routes */}
            <Route path="contact" element={<DisplayContact />} />

            {/* Courses routes */}
            <Route path="add-course" element={<NewCourseAddForm />} />
            <Route path="allCourses" element={<CourseDashboard />} />
            <Route path="update-course/:id" element={<UpdateCourse />} />
            <Route
              path="purchased-transaction"
              element={<PurchasedTransaction />}
            />
            <Route path="add-course" element={<NewCourseAddForm />} />
            <Route path="allCourses" element={<CourseDashboard />} />
            <Route path="update-course/:id" element={<UpdateCourse />} />
            <Route
              path="purchased-transaction"
              element={<PurchasedTransaction />}
            />
            <Route path="add-syllabus" element={<AddSyllabus />} />
            <Route path="add-ebook" element={<AddEbook />} />
            <Route path="add-ppt" element={<AddPPT />} />

            {/* certificate routes */}
            <Route path="upload-certificate" element={<UploadCertificate />} />
            <Route path="view-certificate" element={<ViewCertificates />} />
            <Route path="edit-certificate/:id" element={<EditCertificate />} />

            {/* Register user */}
            <Route path="allUsers" element={<DisplayRegisterUser />} />
          </Route>
          <Route path="*" element={<PagesNotFound />} />
        </Routes>
        <ScrollToTopButton />
      </div>
    </>
  );
}

export default App;
