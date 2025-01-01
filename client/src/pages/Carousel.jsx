import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";
import CarouselImage from "../assets/images/htmlcssjs.jpg";
import axios from "axios";
import { useNavigate } from "react-router";

const Carousel = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const getAllCourses = async () => {
    try {
      const data = await axios.get("/api/v1/course");
      console.log(data.data.data.courses);
      if (data.data.success) {
        setCourses(data.data.data.courses);
      }
    } catch (e) {
      console.log("err in gettting courses", e);
    }
  };
  useEffect(() => {
    getAllCourses();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto py-10 my-10">
      <h2 className="text-center text-4xl text-[#1D2027] font-semibold">
        Featured Courses
      </h2>
      <p className="text-center w-full my-4 text-slate-600 px-10">
        Our courses have been designed by experts to help you develop a
        different set of skills to your competition, to sharpen your focus,
        build confidence, establish communication skills, and develop a unique
        network of contacts. Our courses are compatible with industry – many
        schools and colleges simply do not do this.
      </p>
      <Slider {...settings}>
        {courses?.map((course) => (
          <div key={course._id} className="p-5">
            <div className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 rounded-lg overflow-hidden relative">
              {/* Image Section */}
              <div className="w-full h-56">
                <img
                  src={course.courseThumbnail}
                  alt={course.courseTitle}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Price Badge */}
              <div className="absolute top-4 left-4 bg-[#DF5E7E] text-white px-6 py-2 rounded-full font-semibold text-sm">
                {course.coursePrice} INR
              </div>

              {/* Course Info */}
              <div className="p-5">
                {/* Category Tag */}
                <p className="text-xs p-2 rounded-full text-[#DF5E7E] ml-3 bg-[#FCDFE4] inline">
                  {course.category}
                </p>
                {/* Course Title */}
                <h3 className="text-xl mt-3 font-semibold text-[#1D2027] hover:text-[#FE0000] cursor-pointer">
                  {course.courseTitle}
                </h3>
                {/* Course Stats */}
                <div className="flex items-center gap-4 text-sm text-slate-600 mt-2">
                  <div className="flex items-center gap-1">
                    <i className="fa-regular fa-file text-[#FE0000]"></i>
                    <span>21 Lessons</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <i className="fa-solid fa-user text-[#FE0000]"></i>
                    <span> {course.enrolledStudent.length} Student</span>
                  </div>
                </div>
              </div>

              {/* Know More Button */}
              <div className="py-4 px-5 flex justify-between items-center">
                <button
                  onClick={() => navigate(`/course-detail/${course._id}`)}
                  className="text-[#FE0000] text-sm font-semibold flex items-center gap-2 hover:text-[#581F27] transition-all duration-300"
                >
                  <p className="hover:underline">Know More</p>
                  <i className="fa-solid fa-arrow-right-long"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
