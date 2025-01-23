import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";
import { baseURL } from "../../constant/constant";

const SinglePageLatestNews = () => {
  const [singleNews, setSingleNews] = useState({});
  const { id } = useParams();

  const getSingleNews = async () => {
    try {
      const data = await axios.get(`${baseURL}/api/v1/news/${id}`);
      setSingleNews(data.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getSingleNews();
  }, [id]);

  const handleWhatsAppGroup = () => {
    window.open("https://chat.whatsapp.com/Hd5vk5fZo4392rJHF2jIAG");
  };
  return (
    <div className="flex flex-col justify-center mt-24">
      <h1 className="py-10 text-center text-3xl lg:text-4xl font-semibold bg-[#EEF4FC]">
        Our News Update
      </h1>
      <div className="flex flex-col gap-4 lg:flex-row py-10 px-4 lg:px-32">
        <div className="lg:w-1/2 flex flex-col justify-center ">
          {" "}
          <h2 className="lg:px-10 font-semibold text-3xl lg:text-4xl uppercase">
            {singleNews.newsHeadline}
          </h2>
          <p className="leading-6 lg:px-10 py-1 mt-3 text-slate-600">
            {singleNews.newsDescription}
          </p>
          <div className="flex gap-2 items-center justify-start lg:px-10 mt-4">
            {/* <button className="bg-[#fd0c0c] hover:bg-[#581F27] transition-all ease-in duration-200 text-white py-2 px-5 md:py-4 rounded-sm md:px-10">
              Pay Now
            </button> */}
            <button
              className="bg-[#fd0c0c] hover:bg-[#581F27] transition-all ease-in duration-200 text-white py-2 px-5 md:py-4 rounded-sm md:px-10"
              onClick={handleWhatsAppGroup}
            >
              Join WhatsGroup
            </button>
          </div>
        </div>
        <div className="lg:w-1/2 lg:p-10">
          <img
            src={singleNews.newsImage}
            className="w-full h-auto"
            alt="news image"
          />
        </div>
      </div>
    </div>
  );
};

export default SinglePageLatestNews;
