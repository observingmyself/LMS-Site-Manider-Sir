import React, { useState, useEffect } from "react";
import TransparentImage from "../../assets/images/Transparent-logo.png";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get current location
  const [token, setToken] = useState(() =>
    JSON.parse(localStorage.getItem("token"))
  );

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
    localStorage.setItem("token", JSON.stringify(""));
    setToken(null);
    navigate("/login");
    window.location.reload();
  };

  // Scroll to top when the location changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <>
      <div
        className={`w-screen px-[25px] fixed top-0 left-0 z-20 lg:px-[80px] ${
          isScrolled ? "h-[80px] bg-white" : "h-[90px] bg-transparent"
        } flex justify-between lg:justify-between items-center transition-all duration-300 ${
          menuOpen ? "bg-white" : ""
        }`}
      >
        {/* Navbar left */}
        <div className="w-3/4 lg:w-1/4 flex items-center">
          <img
            src={TransparentImage}
            alt="Logo"
            className={`${
              isScrolled ? "w-[70px] h-[70px]" : "w-[80px] h-[80px]"
            } transition-all duration-300`}
          />
          <h4 className="text-[#FD0C0C] font-semibold">
            Advance Computer Centre
          </h4>
        </div>

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
                className="mx-4 px-2 rounded bg-[#F2EFF2] text-[#FE0000] py-1 text-[16px]"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className="mx-4 px-2 rounded hover:bg-[#F2EFF2] hover:text-[#FE0000] py-1 text-slate-600 text-[16px]"
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/courses"
                className="mx-4 px-2 rounded hover:bg-[#F2EFF2] hover:text-[#FE0000] py-1 text-slate-600 text-[16px]"
              >
                Courses
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blog"
                className="mx-4 px-2 rounded hover:bg-[#F2EFF2] hover:text-[#FE0000] py-1 text-slate-600 text-[16px]"
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/portfolio"
                className="mx-4 px-2 rounded hover:bg-[#F2EFF2] hover:text-[#FE0000] py-1 text-slate-600 text-[16px]"
              >
                Portfolio
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className="mx-4 px-2 rounded hover:bg-[#F2EFF2] hover:text-[#FE0000] py-1 text-slate-600 text-[16px]"
              >
                Contact
              </NavLink>
            </li>
            <li>
              {token ? (
                <button
                  onClick={handleLogout}
                  className="px-2 py-1 bg-[#FE0000] text-white"
                >
                  Logout
                </button>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="mx-4 px-2 rounded hover:bg-[#F2EFF2] hover:text-[#FE0000] py-1 text-slate-600 text-[16px]"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="mx-4 px-2 rounded hover:bg-[#F2EFF2] hover:text-[#FE0000] py-1 text-slate-600 text-[16px]"
                  >
                    Register
                  </NavLink>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* Navbar toggler menu */}
      <div
        className={`navbar-toggler py-[16px] fixed top-16 z-10 transition-all duration-500 lg:hidden bg-white w-full ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <ul className="flex gap-4 mt-1 flex-col justify-evenly items-center w-full">
          <li>
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-slate-600 hover:text-[#FE0000] text-[16px]"
            >
              Home
            </NavLink>
          </li>
          {/* Other NavLinks */}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
