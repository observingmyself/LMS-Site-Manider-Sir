import React from "react";
import BannerImg from "../../assets/images/join.jpg";
import { useNavigate } from "react-router";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div
      className="relative my-14 w-full h-[50vh] flex items-center justify-center text-center text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${BannerImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "darken",
      }}
    >
      <div className="z-10">
        <h1 className="text-xl md:text-4xl font-bold mb-10 text-center">
          To Check The Authentication Of Your <br />Certificate, Please
        </h1>
        <button onClick={()=>navigate('/certificate-authentication')} className="px-6 py-4 bg-white text-black  rounded-sm shadow hover:bg-gray-200">
          Click Here
        </button>
      </div>
    </div>
  );
};

export default Banner;
