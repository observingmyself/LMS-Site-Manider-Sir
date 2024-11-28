import React from "react";
import TransparentImage from '../../assets/Transparent-logo.png'
const Navbar = () => {
  return (
    <div className="w-screen fixed px-[25px] h-[90px] flex justify-between lg:justify-between items-center bg-transparent">
      <div className="w-3/4 lg:w-1/4 flex items-center">
        <img src={TransparentImage} alt="" className="w-[80px] h-[80px]" />
        <h4 className="text-[#FD0C0C] text-nowrap font-semibold">
          Advance Computer Centre
        </h4>
      </div>
      <div>
        <div className="lg:hidden bg-[#FD0C0C] text-xl px-2 py-1 rounded text-white">
          <i class="fa-solid fa-bars"></i>
        </div>
        <ul className="hidden lg:flex justify-evenly  w-1/4 lg:w-3/4">
          <li>
            <a href="" className="mx-4 text-slate-600 text-[16px]">
              Home
            </a>
          </li>
          <li>
            <a href="" className="mx-4 text-slate-600 text-[16px]">
              About
            </a>
          </li>
          <li>
            <a href="" className="mx-4 text-slate-600 text-[16px]">
              Courses
            </a>
          </li>
          <li>
            <a href="" className="mx-4 text-slate-600 text-[16px]">
              Blog
            </a>
          </li>
          <li>
            <a href="" className="mx-4 text-slate-600 text-[16px]">
              Portfolio
            </a>
          </li>
          <li>
            <a href="" className="mx-4 text-slate-600 text-[16px]">
              Contact
            </a>
          </li>
          <li>
            <a href="" className="mx-7 text-slate-600 text-[16px]">
              Login
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
