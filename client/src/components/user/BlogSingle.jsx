import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import IMG1 from "../../assets/images/b77.jpg";
import IMG2 from "../../assets/images/b6.png";
import { baseURL } from "../../constant/constant";

const BlogSingle = () => {
  const { id } = useParams();
  // console.log(id)
  const [singleBlog, setSingleBlog] = useState({});

  const getSingleBlog = async () => {
    try {
      const data = await axios.get(`${baseURL}/api/v1/blog/${id}`, {
        withCredentials: true,
      });
      if (data) {
        // console.log(data)
        setSingleBlog(data.data.data);
        // console.log(data.data.data.Description)
        // console.log(singleBlog.BlogTitle)
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getSingleBlog();
  }, [id]);

  return (
    <div className="mt-24 pb-10">
      <div className="py-4 bg-[#EEF4FC]">
        <h4 className="text-3xl px-20 text-center font-semibold">
          {singleBlog.BlogTitle}
        </h4>
        <div className="mt-3 flex justify-center items-center gap-4">
          <span className="text-sm text-[#fd0c0c] font-normal ">
            <i class="fa-solid font-light text-[#fd0c0c] fa-user mr-1"></i>{" "}
            {singleBlog.Instructor}
          </span>
          <span className="text-slate-300 text-normal">{" | "}</span>
          <span className="text-sm text-[#fd0c0c] font-normal">
            <i class="fa-solid font-light fa-folder-open mr-1"></i>{" "}
            {singleBlog.BlogType}
          </span>
        </div>
      </div>
      <div className="mt-10 flex flex-col justify-center px-6 md:px-32 lg:px-40">
        <div className="bg-white border border-slate-300 rounded-xl flex flex-col items-center py-10">
          <img src={singleBlog.BlogUrl} alt="" className="max-h-[90vh]" />
          <h6 className="my-8 text-2xl md:text-3xl px-6 md:px-10 font-semibold">
            More about this Topic
          </h6>
          <pre className="px-6 md:px-10 mt-4 text-wrap text-slate-800">
            {singleBlog.Description}
          </pre>
          <div className="flex flex-col md:flex-row mt-4 w-full px-10 pt-10">
            <img
              src={IMG1}
              alt="Related Topic"
              className="w-full md:w-1/2 h-auto object-cover"
            />
            <img
              src={IMG2}
              alt="Related Topic"
              className="w-full md:w-1/2 h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSingle;
