import React, { useState } from "react";
import WhiteLogo from "../../assets/images/White-logo-removebg-preview.png";
import Sunita from "../../assets/images/t1.jpg";
import { useNavigate } from "react-router";

const AdminNavbar = ({ toggleSidebar }) => {
  const [isFull, setIsFull] = useState(false);
  const navigate = useNavigate();

  const handleScreenSize = () => {
    if (!isFull) {
      document.documentElement.requestFullscreen().then(() => setIsFull(true));
    } else {
      document.exitFullscreen().then(() => setIsFull(false));
    }
  };
  const handleLogout = () => {
    localStorage.setItem('token',JSON.stringify(""))
    navigate('/')
  }
  return (
    <div className="flex z-20 fixed shadow-lg flex-col lg:flex-row w-full h-20 bg-white">
      <div className="w-full lg:w-[330px] flex justify-between items-center py-0 px-8 h-full bg-slate-800">
        <img src={WhiteLogo} className="h-full" alt="Logo" />
        <button
          className="text-white border border-white text-sm px-2 py-1 rounded-full bg-transparent"
          onClick={toggleSidebar} // Toggle the sidebar on button click
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
      <div className="w-full lg:w-full h-full hidden lg:flex items-center justify-between py-0 px-6">
        <button className="hidden lg:block" onClick={handleScreenSize}>
          {isFull ? (
            <i className="fa-solid text-black text-lg fa-compress"></i>
          ) : (
            <i className="fa-solid text-black text-lg fa-expand"></i>
          )}
        </button>
        <div className="h-full flex group relative items-center justify-center gap-2">
          <img src={Sunita} className="w-8" alt="" />
          <div className="text-slate-600">
            divyam <i className="fa-solid fa-caret-down"></i>
          </div>
          <button onClick={handleLogout} className="hidden hover:bg-slate-200 gap-2 justify-center items-center shadow-lg border border-slate-800 right-0 absolute top-20 px-10 py-2 bg-white group-hover:flex"><i className="fa-solid fa-door-open"></i>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
