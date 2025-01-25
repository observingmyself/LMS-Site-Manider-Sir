import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { baseURL } from "../../constant/constant";

const Blog = () => {
  const [blog, setBlog] = useState([]);
  const navigate = useNavigate();

  const getBlog = async () => {
    try {
      const data = await axios.get(`${baseURL}/api/v1/blog`, {
        withCredentials: true,
      });
      if (data) {
        setBlog(data.data.data.data);

        // console.log(data)
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getBlog();
  }, []);

  return (
    <div className="mt-24 pb-10">
      <div className="py-6 bg-[#EEF4FC]">
        <h1 className="text-center text-3xl lg:text-4xl text-gray-900 font-semibold ">
          Blog posts
        </h1>
        <p className="text-center mt-4 flex items-center justify-center gap-2">
          <span
            className="text-[#fd0c0c] hover:underline"
            onClick={() => navigate("/")}
          >
            Home
          </span>
          <box-icon name="fast-forward" flip="vertical"></box-icon>Blog
        </p>
      </div>
      <div className="mt-10 grid gap-5 lg:mx-32 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {blog?.map((blog) => {
          return (
            <div
              key={blog._id}
              onClick={() => navigate(`/blog/${blog._id}`)}
              className="bg-white shadow-md hover:shadow-lg transition-all duration-500 group pb-8"
            >
              <div className="w-full h-auto">
                <img src={blog.BlogUrl} className="h-64 w-full" alt="blogurl" />
              </div>
              <div className="px-6 text-2xl font-semibold mt-3">
                <h4>{blog.BlogTitle}</h4>
                <div className="mt-3">
                  <span className="text-sm text-[#fd0c0c] font-normal ">
                    <i class="fa-solid font-light text-[#fd0c0c] fa-user mr-1"></i>{" "}
                    {blog.Instructor}
                  </span>
                  <span className="text-slate-300 text-normal">{" | "}</span>
                  <span className="text-sm text-[#fd0c0c] font-normal">
                    <i class="fa-solid font-light fa-folder-open mr-1"></i>{" "}
                    {blog.BlogType}
                  </span>
                </div>
                <hr className="mt-5" />
                <p className="text-base my-4 font-normal leading-6 text-slate-600">
                  {blog.Description.slice(0, 90)}......
                </p>
                <div className="text-sm font-normal hover:underline flex items-center gap-2 group-hover:gap-4 transition-all duration-300 text-[#fd0c0c]">
                  Continue <i class="fa-solid fa-arrow-right"></i>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blog;
