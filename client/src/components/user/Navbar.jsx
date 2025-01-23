import React, { useState, useEffect } from "react";
import TransparentImage from "../../assets/images/Transparent-logo.png";
import { NavLink, useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logoutAuth } from "../../store/auth-slice";
import defaultImg from "../../assets/images/defaultimg.webp";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get current location
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [token, setToken] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setToken(isAuthenticated);
  }, [isAuthenticated]);

  const navbarToggler = () => {
    setMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    try {
      dispatch(logoutAuth()).then(() => toast("Logged out"));
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Scroll to top when the location changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  // Function to check if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div
        className={`w-screen px-[25px] fixed top-0 left-0 z-20 lg:px-[40px] xl:px-[60px] ${
          isScrolled ? "h-[80px] bg-white" : "h-[90px] bg-transparent"
        } flex justify-between lg:justify-between items-center transition-all duration-300 gap-2 ${
          menuOpen ? "bg-white" : ""
        }`}
      >
        {/* Navbar left */}
        <div className="w-3/4 lg:w-1/4 flex items-center">
          <Link className="flex items-center" to="/">
            <img
              src={TransparentImage}
              alt="Logo"
              className={`${
                isScrolled ? "w-[60px] h-[60px]" : "w-[70px] h-[70px]"
              } transition-all duration-300`}
            />
            <h4 className="text-[#FD0C0C] font-semibold">
              Advance Computer Centre
            </h4>
          </Link>
        </div>

        {/* Profile Toggle */}
        {token ? (
          <>
            <button
              className="h-10 w-10 focus:outline-none lg:hidden"
              onClick={toggleMenu}
            >
              <img
                src={user?.profileImg ? user.profileImg : defaultImg}
                className="rounded-full"
                alt="User Profile"
              />
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-60 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                <ul className="py-1">
                  <li>
                    <button
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => navigate("/profile")}
                    >
                      Profile
                    </button>
                  </li>
                  <li>
                    <button
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => navigate("/change-password")}
                    >
                      Change Password
                    </button>
                  </li>
                  <li>
                    <button
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => navigate("/myLearning")}
                    >
                      My Learning
                    </button>
                  </li>
                  <li>
                    <button
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={handleLogout}
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </>
        ) : (
          ""
        )}
        {/* Navbar right */}
        <div>
          <div
            onClick={navbarToggler}
            className="lg:hidden cursor-pointer bg-[#FD0C0C] text-xl px-2 py-1 rounded text-white"
          >
            {menuOpen ? (
              <i className="fa-solid fa-x"></i>
            ) : (
              <i className="fa-solid fa-bars"></i>
            )}
          </div>
          <ul className="hidden lg:flex justify-evenly items-center w-1/4 lg:w-3/4">
            <li>
              <NavLink
                to="/"
                className={`mx-4 px-2 rounded py-1 text-[16px] ${
                  isActive("/")
                    ? "bg-[#F2EFF2] text-[#FE0000]"
                    : "text-[#FE0000]"
                }`}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={`mx-4 px-2 rounded py-1 text-[16px] ${
                  isActive("/about")
                    ? "bg-[#F2EFF2] text-[#FE0000]"
                    : "text-slate-600"
                }`}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/courses"
                className={`mx-4 px-2 rounded py-1 text-[16px] ${
                  isActive("/courses")
                    ? "bg-[#F2EFF2] text-[#FE0000]"
                    : "text-slate-600"
                }`}
              >
                Courses
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blog"
                className={`mx-4 px-2 rounded py-1 text-[16px] ${
                  isActive("/blog")
                    ? "bg-[#F2EFF2] text-[#FE0000]"
                    : "text-slate-600"
                }`}
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={`mx-4 px-2 rounded py-1 text-[16px] ${
                  isActive("/contact")
                    ? "bg-[#F2EFF2] text-[#FE0000]"
                    : "text-slate-600"
                }`}
              >
                Contact
              </NavLink>
            </li>
            <li>
              {token ? (
                <>
                  <button
                    className="h-10 w-10 focus:outline-none"
                    onClick={toggleMenu}
                  >
                    <img
                      src={user?.profileImg ? user.profileImg : defaultImg}
                      className="rounded-full"
                      alt="User Profile"
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                      <ul className="py-1 flex flex-col">
                        <li>
                          <button
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                            onClick={() => navigate("/profile")}
                          >
                            Profile
                          </button>
                        </li>
                        <li>
                          <button
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                            onClick={() => navigate("/change-password")}
                          >
                            Change Password
                          </button>
                        </li>
                        <li>
                          <button
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                            onClick={() => navigate("/myLearning")}
                          >
                            My Learning
                          </button>
                        </li>
                        <li>
                          <button
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                            onClick={handleLogout}
                          >
                            Sign Out
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="mx-4 px-2 rounded py-1 text-slate-600 text-[16px] hover:bg-[#F2EFF2] hover:text-[#FE0000]"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="mx-4 px-2 rounded py-1 text-slate-600 text-[16px] hover:bg-[#F2EFF2] hover:text-[#FE0000]"
                  >
                    Register
                  </NavLink>
                </>
              )}
            </li>
          </ul>
        </div>

        {/* Navbar toggler menu */}

        <div
          className={`navbar-toggler py-[16px] shadow-lg fixed top-16 z-20 transition-all duration-500 lg:hidden bg-white w-full -left-0 ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex gap-6 border-t py-[16px] border-secondary-200 mt-1 flex-col justify-evenly items-center w-full">
            <li>
              <NavLink
                to="/"
                onClick={() => setMenuOpen(false)}
                className={`text-slate-600 text-[16px] ${
                  isActive("/") ? "text-[#FE0000]" : ""
                }`}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                onClick={() => setMenuOpen(false)}
                className={`text-slate-600 text-[16px] ${
                  isActive("/about") ? "text-[#FE0000]" : ""
                }`}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/courses"
                onClick={() => setMenuOpen(false)}
                className={`text-slate-600 text-[16px] ${
                  isActive("/courses") ? "text-[#FE0000]" : ""
                }`}
              >
                Courses
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blog"
                onClick={() => setMenuOpen(false)}
                className={`text-slate-600 text-[16px] ${
                  isActive("/blog") ? "text-[#FE0000]" : ""
                }`}
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className={`text-slate-600 text-[16px] ${
                  isActive("/contact") ? "text-[#FE0000]" : ""
                }`}
              >
                Contact
              </NavLink>
            </li>
            <li>
              {token ? (
                ""
              ) : (
                <>
                  <ul className="flex gap-6 mt-1 flex-col justify-evenly items-center w-full">
                    <li>
                      <NavLink
                        to="/login"
                        onClick={() => setMenuOpen(false)}
                        className={`text-slate-600 text-[16px] ${
                          isActive("/login") ? "text-[#FE0000]" : ""
                        }`}
                      >
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/register"
                        onClick={() => setMenuOpen(false)}
                        className={`text-slate-600 text-[16px] ${
                          isActive("/register") ? "text-[#FE0000]" : ""
                        }`}
                      >
                        Register
                      </NavLink>
                    </li>
                  </ul>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
