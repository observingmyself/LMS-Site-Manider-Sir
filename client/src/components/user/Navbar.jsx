import React, { useState } from "react";
import TransparentImage from "../../assets/images/Transparent-logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navbarToggler = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <>
      <div className={`w-screen px-[25px] absolute z-20 lg:px-[80px] h-[90px] flex justify-between lg:justify-between items-center ${menuOpen ? "bg-white" : "bg-transparent"} lg:bg-transparent`}>
        {/* Navbar left starts */}
        <div className="w-3/4 lg:w-1/4 flex items-center">
          <img src={TransparentImage} alt="" className="w-[80px] h-[80px]" />
          <h4 className="text-[#FD0C0C] text-nowrap font-semibold">
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
          <ul className="hidden lg:flex justify-evenly w-1/4 lg:w-3/4">
            <li>
              <a href="" className="mx-4 px-2 rounded hover:bg-[#F2EFF2] hover:text-[#FE0000] py-1 text-slate-600 text-[16px]">
                Home
              </a>
            </li>
            <li>
              <a href="" className="mx-4 px-2 rounded hover:bg-[#F2EFF2] hover:text-[#FE0000] py-1 text-slate-600 text-[16px]">
                About
              </a>
            </li>
            <li>
              <a href="" className="mx-4 px-2 rounded hover:bg-[#F2EFF2] hover:text-[#FE0000] py-1 text-slate-600 text-[16px]">
                Courses
              </a>
            </li>
            <li>
              <a href="" className="mx-4 px-2 rounded hover:bg-[#F2EFF2] hover:text-[#FE0000] py-1 text-slate-600 text-[16px]">
                Blog
              </a>
            </li>
            <li>
              <a href="" className="mx-4 px-2 rounded hover:bg-[#F2EFF2] hover:text-[#FE0000] py-1 text-slate-600 text-[16px]">
                Portfolio
              </a>
            </li>
            <li>
              <a href="" className="mx-4 px-2 rounded hover:bg-[#F2EFF2] hover:text-[#FE0000] py-1 text-slate-600 text-[16px]">
                Contact
              </a>
            </li>
            <li>
              <a href="" className="mx-4 px-2 rounded hover:bg-[#F2EFF2] hover:text-[#FE0000] py-1 text-slate-600 text-[16px]">
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* Navbar toggler menu */}
      <div
        className={`navbar-toggler py-[16px] absolute top-16 z-10 transition-all duration-500 ease-in-out lg:hidden bg-white w-full ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex gap-4 mt-1 flex-col justify-evenly items-center w-full">
          <li>
            <a href="" className=" text-slate-600 hover:text-[#FE0000] text-[16px]">
              Home
            </a>
          </li>
          <li>
            <a href="" className=" text-slate-600 hover:text-[#FE0000] text-[16px]">
              About
            </a>
          </li>
          <li>
            <a href="" className=" text-slate-600 hover:text-[#FE0000] text-[16px]">
              Courses
            </a>
          </li>
          <li>
            <a href="" className=" text-slate-600 hover:text-[#FE0000] text-[16px]">
              Blog
            </a>
          </li>
          <li>
            <a href="" className=" text-slate-600 hover:text-[#FE0000] text-[16px]">
              Portfolio
            </a>
          </li>
          <li>
            <a href="" className=" text-slate-600 hover:text-[#FE0000] text-[16px]">
              Contact
            </a>
          </li>
          <li>
            <a href="" className=" text-slate-600 hover:text-[#FE0000] text-[16px]">
              Login
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
