import React, { useState, useRef } from "react";
import Sunita from "../../assets/images/t1.jpg";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logoutAuth } from "../../store/auth-slice";
import { toast } from "react-toastify";

const AdminSidebar = ({ isSidebarOpen }) => {
  const [isLogoutOpen,setIsLogoutOpen] = useState(false)
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isStudentsOpen, setIsStudentsOpen] = useState(false);
  const [isCertificatesOpen, setIsCertificatesOpen] = useState(false);
  const [isRegistrationsOpen, setIsRegistrationsOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [isSubscriptionsOpen, setIsSubscriptionsOpen] = useState(false);
  const [isBlogsOpen, setIsBlogsOpen] = useState(false);
  const [isPostsOpen, setIsPostsOpen] = useState(false);
  const [isTeamOpen, setIsTeamOpen] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const coursesContentRef = useRef(null);
  const studentsContentRef = useRef(null);
  const certificateContentRef = useRef(null);
  const registrationContentRef = useRef(null);
  const reviewContentRef = useRef(null);
  const contactContentRef = useRef(null);
  const subscriptionContentRef = useRef(null);
  const blogContentRef = useRef(null);
  const postContentRef = useRef(null);
  const teamContentRef = useRef(null);
  const logoutContentRef = useRef(null);

    const toggleLogoutOpen = () => {
      setIsLogoutOpen((prev) => !prev);
    };

  const toggleCoursesDropdown = () => {
    setIsCoursesOpen((prev) => !prev);
  };

  const toggleStudentsDropdown = () => {
    setIsStudentsOpen((prev) => !prev);
  };

  const toggleCertificatesDropdown = () => {
    setIsCertificatesOpen((prev) => !prev);
  };

  const toggleRegistrationsDropdown = () => {
    setIsRegistrationsOpen((prev) => !prev);
  };

  const toggleReviewsDropdown = () => {
    setIsReviewsOpen((prev) => !prev);
  };

  const toggleContactsDropdown = () => {
    setIsContactsOpen((prev) => !prev);
  };

  const toggleSubscriptionsDropdown = () => {
    setIsSubscriptionsOpen((prev) => !prev);
  };

  const toggleBlogsDropdown = () => {
    setIsBlogsOpen((prev) => !prev);
  };

  const togglePostsDropdown = () => {
    setIsPostsOpen((prev) => !prev);
  };

  const toggleTeamDropdown = () => {
    setIsTeamOpen((prev) => !prev);
  };
  const handleLogout = () => {
    dispatch(logoutAuth()).then(()=>toast("Logged out"))
  }
  
  return (
    <div
      className={`w-[280px] overflow-scroll  py-8 px-5 flex flex-col justify-start items-start z-20 fixed top-20 -left-64 h-full bg-white shadow-lg transition-all duration-300 ${
        isSidebarOpen ? "left-0" : "-left-72"
      }`}
    >
      <div className="flex flex-col items-center w-full">
        <div className="flex  gap-4 items-center mb-6">
          <img src={Sunita} alt="picture" className="w-8" />
          <div>
            <h4 className="text-sm font-semibold">Divyam</h4>
            <p className="text-[12px] font-light" onClick={toggleLogoutOpen}>
              Designer<i className="ml-1 fa-solid fa-caret-down"></i>
            </p>
          </div>
          <div
            ref={logoutContentRef}
            className="overflow-hidden transition-all duration-300"
            style={{
              maxHeight: isLogoutOpen
                ? `${logoutContentRef.current.scrollHeight}px`
                : "0",
            }}
          >
            <div className="ml-8 mt-3 text-sm">
              <p
                onClick={handleLogout}
                className="cursor-pointer hover:text-blue-600 flex items-center justify-left"
              >
                <i className="fa-solid fa-chevron-down mr-2 text-[10px] -rotate-90"></i>
                LogOut
              </p>
            </div>
          </div>
        </div>
        <div className="w-full">
          <input
            type="text"
            placeholder="Search"
            className="w-full text-sm rounded-lg px-3 py-2 outline-none border border-slate-300"
          />
        </div>
        <div className="mt-3 w-full">
          <h5 className="text-sm text-slate-500">Layout</h5>
          <div className="flex items-center gap-2 mt-5">
            <i className="fa-solid fa-house hihi text-[12px] px-2 py-2 rounded-sm text-white bg-blue-500"></i>
            <p className="font-semibold text-sm">Dashboard</p>
          </div>

          {/* Courses Dropdown */}
          <div className="mt-5">
            <div
              className="flex justify-between items-center gap-2 cursor-pointer"
              onClick={toggleCoursesDropdown}
            >
              <div className="flex gap-2 items-center">
                <i className="fa-solid fa-star hihi text-[12px] px-2 py-2 rounded-sm text-white bg-[#FC6180]"></i>
                <p className="text-sm">Courses Table</p>
              </div>
              <i
                className={`fa-solid fa-chevron-down text-sm transition-transform ${
                  isCoursesOpen ? "rotate-180" : ""
                }`}
              ></i>
            </div>
            <div
              ref={coursesContentRef}
              className="overflow-hidden transition-all duration-300"
              style={{
                maxHeight: isCoursesOpen
                  ? `${coursesContentRef.current.scrollHeight}px`
                  : "0",
              }}
            >
              <div className="ml-8 mt-3 text-sm">
                <p
                  onClick={() => navigate("/admin/dashboard/allCourses")}
                  className="cursor-pointer hover:text-blue-600 flex items-center justify-left"
                >
                  <i className="fa-solid fa-chevron-down mr-2 text-[10px] -rotate-90"></i>
                  View Courses
                </p>
                <p
                  onClick={() => navigate("/admin/dashboard/add-course")}
                  className="cursor-pointer hover:text-blue-600 mt-2"
                >
                  {" "}
                  <i className="fa-solid  fa-chevron-down mr-2 text-[10px] -rotate-90"></i>
                  Insert New Courses
                </p>
                <p
                  onClick={() =>
                    navigate("/admin/dashboard/purchased-transaction")
                  }
                  className="cursor-pointer hover:text-blue-600 mt-2"
                >
                  {" "}
                  <i className="fa-solid  fa-chevron-down mr-2 text-[10px] -rotate-90"></i>
                  Purchased Transactions
                </p>
                <p
                  onClick={() =>
                    navigate("/admin/dashboard/add-syllabus")
                  }
                  className="cursor-pointer hover:text-blue-600 mt-2"
                >
                  {" "}
                  <i className="fa-solid  fa-chevron-down mr-2 text-[10px] -rotate-90"></i>
                  Add Syllabus
                </p>
                <p
                  onClick={() =>
                    navigate("/admin/dashboard/add-ebook")
                  }
                  className="cursor-pointer hover:text-blue-600 mt-2"
                >
                  {" "}
                  <i className="fa-solid  fa-chevron-down mr-2 text-[10px] -rotate-90"></i>
                  Add EBook
                </p>
                <p
                  onClick={() =>
                    navigate("/admin/dashboard/add-ppt")
                  }
                  className="cursor-pointer hover:text-blue-600 mt-2"
                >
                  {" "}
                  <i className="fa-solid  fa-chevron-down mr-2 text-[10px] -rotate-90"></i>
                  Add PPT
                </p>
              </div>
            </div>
          </div>

          {/* Students Dropdown */}
          <div className="mt-5">
            <div
              className="flex items-center justify-between gap-2 cursor-pointer"
              onClick={toggleStudentsDropdown}
            >
              <div className="flex gap-2 items-center">
                <i className="fa-solid fa-star hihi text-[12px] px-2 py-2 rounded-sm text-white bg-[#93BE52]"></i>
                <p className="text-sm">Student Registration Table</p>
              </div>
              <i
                className={`fa-solid fa-chevron-down text-sm transition-transform ${
                  isStudentsOpen ? "rotate-180" : ""
                }`}
              ></i>
            </div>
            <div
              ref={studentsContentRef}
              className="overflow-hidden transition-all duration-300"
              style={{
                maxHeight: isStudentsOpen
                  ? `${studentsContentRef.current.scrollHeight}px`
                  : "0",
              }}
            >
              <div className="ml-8 mt-3 text-sm">
                <p
                  onClick={() => navigate("/admin/dashboard/registrations")}
                  className="hover:text-blue-600 cursor-pointer flex items-center justify-left"
                >
                  <i className="fa-solid fa-chevron-down mr-2 text-[10px] -rotate-90"></i>
                  View Registrations
                </p>
              </div>
            </div>
          </div>

          {/* Certicate table */}
          <div className="mt-5">
            <div
              className="flex items-center justify-between gap-2 cursor-pointer"
              onClick={toggleCertificatesDropdown}
            >
              <div className="flex gap-2 items-center">
                <i className="fa-solid fa-star hihi text-[12px] px-2 py-2 rounded-sm text-white bg-[#FFB64D]"></i>
                <p className="text-sm">Certificate Table</p>
              </div>
              <i
                className={`fa-solid fa-chevron-down text-sm transition-transform ${
                  isCertificatesOpen ? "rotate-180" : ""
                }`}
              ></i>
            </div>
            <div
              ref={certificateContentRef}
              className="overflow-hidden transition-all duration-300"
              style={{
                maxHeight: isCertificatesOpen
                  ? `${certificateContentRef.current.scrollHeight}px`
                  : "0",
              }}
            >
              <div className="ml-8 mt-3 text-sm">
                <p
                  onClick={() =>
                    navigate("/admin/dashboard/upload-certificate")
                  }
                  className="cursor-pointer hover:text-blue-600 flex items-center justify-left"
                >
                  <i className="fa-solid fa-chevron-down mr-2 text-[10px] -rotate-90"></i>
                  Upload Certificate
                </p>
                <p
                  onClick={() => navigate("/admin/dashboard/view-certificate")}
                  className="cursor-pointer hover:text-blue-600 mt-2"
                >
                  {" "}
                  <i className="fa-solid  fa-chevron-down mr-2 text-[10px] -rotate-90"></i>
                  View Certificates
                </p>
              </div>
            </div>
          </div>

          {/* Registration Table */}
          <div className="mt-5">
            <div
              className="flex items-center justify-between gap-2 cursor-pointer"
              onClick={toggleRegistrationsDropdown}
            >
              <div className="flex gap-2 items-center">
                <i className="fa-solid fa-star hihi text-[12px] px-2 py-2 rounded-sm text-white bg-[#8E44AD]"></i>
                <p className="text-sm">Registration Table</p>
              </div>
              <i
                className={`fa-solid fa-chevron-down text-sm transition-transform ${
                  isRegistrationsOpen ? "rotate-180" : ""
                }`}
              ></i>
            </div>
            <div
              ref={registrationContentRef}
              className="overflow-hidden transition-all duration-300"
              style={{
                maxHeight: isRegistrationsOpen
                  ? `${registrationContentRef.current.scrollHeight}px`
                  : "0",
              }}
            >
              <div className="ml-8 mt-3 text-sm">
                <p
                  onClick={() => navigate("/admin/dashboard/allUsers")}
                  className="cursor-pointer hover:text-blue-600 flex items-center justify-left"
                >
                  <i className="fa-solid fa-chevron-down mr-2 text-[10px] -rotate-90"></i>
                  View Registration
                </p>
              </div>
            </div>
          </div>

          {/* Review Table */}
          <div className="mt-5">
            <div
              className="flex items-center justify-between gap-2 cursor-pointer"
              onClick={toggleReviewsDropdown}
            >
              <div className="flex gap-2 items-center">
                <i className="fa-solid fa-star hihi text-[12px] px-2 py-2 rounded-sm text-white bg-[#27AE60]"></i>
                <p className="text-sm">Review Table</p>
              </div>
              <i
                className={`fa-solid fa-chevron-down text-sm transition-transform ${
                  isReviewsOpen ? "rotate-180" : ""
                }`}
              ></i>
            </div>
            <div
              ref={reviewContentRef}
              className="overflow-hidden transition-all duration-300"
              style={{
                maxHeight: isReviewsOpen
                  ? `${reviewContentRef.current.scrollHeight}px`
                  : "0",
              }}
            >
              <div className="ml-8 mt-3 text-sm">
                <p className="cursor-pointer hover:text-blue-600 flex items-center justify-left">
                  <i className="fa-solid fa-chevron-down mr-2 text-[10px] -rotate-90"></i>
                  View Reviews
                </p>
              </div>
            </div>
          </div>

          {/* Contact Table */}
          <div className="mt-5">
            <div
              className="flex items-center justify-between gap-2 cursor-pointer"
              onClick={toggleContactsDropdown}
            >
              <div className="flex gap-2 items-center">
                <i className="fa-solid fa-star hihi text-[12px] px-2 py-2 rounded-sm text-white bg-[#2980B9]"></i>
                <p className="text-sm">Contact Table</p>
              </div>
              <i
                className={`fa-solid fa-chevron-down text-sm transition-transform ${
                  isContactsOpen ? "rotate-180" : ""
                }`}
              ></i>
            </div>
            <div
              ref={contactContentRef}
              className="overflow-hidden transition-all duration-300"
              style={{
                maxHeight: isContactsOpen
                  ? `${contactContentRef.current.scrollHeight}px`
                  : "0",
              }}
            >
              <div className="ml-8 mt-3 text-sm">
                <p
                  onClick={() => navigate("/admin/dashboard/contact")}
                  className="cursor-pointer hover:text-blue-600 flex items-center justify-left"
                >
                  <i className="fa-solid fa-chevron-down mr-2 text-[10px] -rotate-90"></i>
                  View Contacts
                </p>
              </div>
            </div>
          </div>

          {/* Blog Table */}
          <div className="mt-5">
            <div
              className="flex items-center justify-between gap-2 cursor-pointer"
              onClick={toggleBlogsDropdown}
            >
              <div className="flex gap-2 items-center">
                <i className="fa-solid fa-star hihi text-[12px] px-2 py-2 rounded-sm text-white bg-[#E74C3C]"></i>
                <p className="text-sm">Blog Table</p>
              </div>
              <i
                className={`fa-solid fa-chevron-down text-sm transition-transform ${
                  isBlogsOpen ? "rotate-180" : ""
                }`}
              ></i>
            </div>
            <div
              ref={blogContentRef}
              className="overflow-hidden transition-all duration-300"
              style={{
                maxHeight: isBlogsOpen
                  ? `${blogContentRef.current.scrollHeight}px`
                  : "0",
              }}
            >
              <div className="ml-8 mt-3 text-sm">
                <p
                  onClick={() => navigate("/admin/dashboard/blog")}
                  className="cursor-pointer hover:text-blue-600 flex items-center justify-left"
                >
                  <i className="fa-solid fa-chevron-down mr-2 text-[10px] -rotate-90"></i>
                  View Blogs
                </p>
                <p
                  onClick={() => navigate("/admin/dashboard/add-blog")}
                  className="cursor-pointer hover:text-blue-600 mt-2"
                >
                  {" "}
                  <i className="fa-solid fa-chevron-down mr-2 text-[10px] -rotate-90"></i>
                  Insert New Blogs
                </p>
              </div>
            </div>
          </div>

          {/* Post Table */}
          <div className="mt-5">
            <div
              className="flex items-center justify-between gap-2 cursor-pointer"
              onClick={togglePostsDropdown}
            >
              <div className="flex gap-2 items-center">
                <i className="fa-solid fa-star hihi text-[12px] px-2 py-2 rounded-sm text-white bg-[#34495E]"></i>
                <p className="text-sm">Post Table</p>
              </div>
              <i
                className={`fa-solid fa-chevron-down text-sm transition-transform ${
                  isPostsOpen ? "rotate-180" : ""
                }`}
              ></i>
            </div>
            <div
              ref={postContentRef}
              className="overflow-hidden transition-all duration-300"
              style={{
                maxHeight: isPostsOpen
                  ? `${postContentRef.current.scrollHeight}px`
                  : "0",
              }}
            >
              <div className="ml-8 mt-3 text-sm">
                <p
                  onClick={() => navigate("/admin/dashboard/news")}
                  className="cursor-pointer hover:text-blue-600 flex items-center justify-left"
                >
                  <i className="fa-solid fa-chevron-down mr-2 text-[10px] -rotate-90"></i>
                  View Posts
                </p>
                <p
                  className="cursor-pointer hover:text-blue-600 mt-2"
                  onClick={() => navigate("/admin/dashboard/news-form")}
                >
                  {" "}
                  <i className="fa-solid fa-chevron-down mr-2 text-[10px] -rotate-90"></i>
                  Insert New Posts
                </p>
              </div>
            </div>
          </div>

          {/* Team Table */}
          <div className="mt-5 mb-20">
            <div
              className="flex items-center justify-between gap-2 cursor-pointer"
              onClick={toggleTeamDropdown}
            >
              <div className="flex gap-2 items-center">
                <i className="fa-solid fa-star hihi text-[12px] px-2 py-2 rounded-sm text-white bg-[#F1C40F]"></i>
                <p className="text-sm">Team Table</p>
              </div>
              <i
                className={`fa-solid fa-chevron-down text-sm transition-transform ${
                  isTeamOpen ? "rotate-180" : ""
                }`}
              ></i>
            </div>
            <div
              ref={teamContentRef}
              className="overflow-hidden transition-all duration-300"
              style={{
                maxHeight: isTeamOpen
                  ? `${teamContentRef.current.scrollHeight}px`
                  : "0",
              }}
            >
              <div className="ml-8 mt-3 text-sm">
                <p
                  onClick={() => navigate("/admin/dashboard/team-members")}
                  className="cursor-pointer hover:text-blue-600 flex items-center justify-left"
                >
                  <i className="fa-solid fa-chevron-down mr-2 text-[10px] -rotate-90"></i>
                  View Team Members
                </p>
                <p
                  onClick={() => navigate("/admin/dashboard/add-member")}
                  className="cursor-pointer hover:text-blue-600 mt-2"
                >
                  {" "}
                  <i className="fa-solid fa-chevron-down mr-2 text-[10px] -rotate-90"></i>
                  Insert New Team Member
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
