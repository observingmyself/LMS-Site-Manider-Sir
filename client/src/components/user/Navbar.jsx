import React, { useState, useEffect } from "react";
import TransparentImage from "../../assets/images/Transparent-logo.png";
import { NavLink, useNavigate } from "react-router";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
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
    setToken(null); // Update the state to trigger a re-render
    navigate('/login')
  };

  return (
    <>
      <div
        className={`w-screen px-[25px] fixed z-20 lg:px-[80px] ${
          isScrolled ? "h-[80px] bg-white shadow-lg" : "h-[90px] bg-transparent"
        } flex justify-between lg:justify-between items-center transition-all duration-300 ${
          menuOpen ? "bg-white" : ""
        }`}
      >
        {/* Navbar left starts */}
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

        {/* Navbar right starts */}
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
                className="mx-4 px-2 rounded hover:bg-[#F2EFF2] hover:text-[#FE0000] py-1 text-slate-600 text-[16px]"
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
                <NavLink
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-slate-600 hover:text-[#FE0000] text-[16px]"
                >
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* Navbar toggler menu */}
      <div
        className={`navbar-toggler py-[16px] fixed top-16 z-10 transition-all duration-500 ease-in-out lg:hidden bg-white w-full ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex gap-4 mt-1 flex-col justify-evenly items-center w-full">
          <li>
            <NavLink
              to="/"
              className="text-slate-600 hover:text-[#FE0000] text-[16px]"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="text-slate-600 hover:text-[#FE0000] text-[16px]"
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/courses"
              className="text-slate-600 hover:text-[#FE0000] text-[16px]"
            >
              Courses
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              className="text-slate-600 hover:text-[#FE0000] text-[16px]"
            >
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/portfolio"
              className="text-slate-600 hover:text-[#FE0000] text-[16px]"
            >
              Portfolio
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="text-slate-600 hover:text-[#FE0000] text-[16px]"
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
              <NavLink
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="text-slate-600 hover:text-[#FE0000] text-[16px]"
              >
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
