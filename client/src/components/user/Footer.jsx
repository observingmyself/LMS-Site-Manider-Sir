import React, { useEffect, useState } from "react";
import TransparentLogo from "../../assets/images/Transparent-logo.png";
import Winter from "../../assets/images/WINTER.jpg";
import CertificateBadge from "../../assets/images/certificate-1356.png";
import "../../index.css";
import { Link, NavLink, useNavigate } from "react-router";
import axios from "axios";
import CertificateModal from "./CertificateModal";

const Footer = () => {
  const [news, setNews] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const getLatestNews = async () => {
    try {
      const data = await axios.get("/api/v1/news");
      if (data) {
        setNews(data.data.data.news);
        // console.log(data)
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getLatestNews();
  }, []);

  return (
    <div className="main">
      {/* Footer Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-5 md:px-20 lg:px-32">
        {/* Section 1 */}
        <div className="flex flex-col justify-start gap-5 mt-5">
          <Link className="flex items-center" to="/">
            <img src={TransparentLogo} alt="" className="w-[80px] h-[80px]" />
            <h4 className="text-[#FD0C0C] font-semibold">
              Advance Computer Centre
            </h4>
          </Link>
          <h4>Learning Computer Programming Languages!</h4>
          <div className="hover:text-[#fd0c0c] hover:underline">
            <i className="fa-solid fa-phone text-[#FD0C0C]"></i> +91 8556917707
          </div>
          <div>
            <i className="fa-regular fa-clock text-[#FD0C0C]"></i> Mon - Sat
            8:00 - 18:00
          </div>
        </div>

        {/* Section 2 */}
        <div className="h-80 flex flex-col justify-start mt-5">
          <h4 className="font-semibold text-xl mb-4">Latest News</h4>
          <div className="flex flex-col gap-3 latest overflow-scroll">
            {Array.isArray(news) &&
              news.map((item) => (
                <div
                  className="cursor-pointer flex gap-2"

                  onClick={() => navigate(`/news/${item._id}`)}
                  key={item._id}
                >
                  <img
                    src={item.newsImage || "https://via.placeholder.com/93x70"}
                    alt=""
                    className="w-[93px] h-[70px]"
                  />
                  <div className="hover:text-[#fd0c0c]">
                    <h4 className="text-sm">{item.newsHeadline}</h4>
                    <h5 className="text-[13px]">
                      <i className="fa-regular fa-clock"></i>{" "}
                      {new Date(item.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </h5>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Section 3 */}
        <div className="flex flex-col justify-start mt-5 mb-10">
          <h4 className="font-semibold text-xl mb-4">Company</h4>
          <div className="flex">
            <ul className="w-1/2 mt-3 flex flex-col gap-3 text-sm">
              <li className="hover:text-[#fd0c0c] text-slate-600 cursor-pointer">
                <NavLink to={`/`}>Home</NavLink>
              </li>
              <li className="hover:text-[#fd0c0c] text-slate-600 cursor-pointer">
                <NavLink to={`/about`}>About Us</NavLink>
              </li>
              <li className="hover:text-[#fd0c0c] text-slate-600 cursor-pointer">
                <NavLink to={`/refund`}>
                  {" "}
                  Cancellation and Refund Policy
                </NavLink>
              </li>
              <li className="hover:text-[#fd0c0c] text-slate-600 cursor-pointer">
                <NavLink to={`/shipping`}>Shipping & Delivery Policy</NavLink>
              </li>
              <li className="hover:text-[#fd0c0c] text-slate-600 cursor-pointer">
                <NavLink to={`/TermandCondition`}>Terms and Conditions</NavLink>
              </li>
              <li className="hover:text-[#fd0c0c] text-slate-600 cursor-pointer">
                <NavLink to={`/PrivacyPolicy`}>Privacy Policy</NavLink>
              </li>
              <li className="hover:text-[#fd0c0c] text-slate-600 cursor-pointer">
                <NavLink to={`/contact`}>Contact Us</NavLink>
              </li>
            </ul>
            <img
              onClick={() => setIsModalOpen(true)}
              src={CertificateBadge}
              alt=""
              className="mt-1 h-10 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Social Links Section */}
      <div className="w-full mt-10 lg:mt-20 clear-both">
        <div className="flex gap-6 justify-center items-center h-20">
          <Link to={""}>
            <i className="fa-brands fa-facebook-f text-[#5A5A5A] hover:text-[#fd0c0c] p-3 rounded-full"></i>
          </Link>
          <Link to={""}>
            <i className="fa-brands fa-linkedin-in text-[#5A5A5A] hover:text-[#fd0c0c] p-3 rounded-full"></i>
          </Link>
          <Link to={""}>
            <i className="fa-brands fa-youtube text-[#5A5A5A] hover:text-[#fd0c0c] p-3 rounded-full"></i>
          </Link>
          <Link to={""}>
            <i className="fa-brands fa-instagram text-[#5A5A5A] hover:text-[#fd0c0c] p-3 rounded-full"></i>
          </Link>
        </div>
        <div>
          <h1 className="text-center text-[#5A5A5A] px-5 pb-5">
            © 2021 Advance computer centre. All rights reserved | Design by
            <span className="hover:text-[#FE0000] font-semibold ">
              {" "}
              Sunita
            </span>{" "}
            <br />
            Powered by{" "}
            <span className="hover:text-[#fd0c0c] font-semibold">
              Pardeep & Moksh
            </span>
          </h1>
        </div>
      </div>
      <CertificateModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default Footer;
