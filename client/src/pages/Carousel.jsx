import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Carousel = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const getAllCourses = async () => {
    try {
      const response = await axios.get("/api/v1/course");
      if (response.data.success) {
        setCourses(response.data.data.courses);
      }
    } catch (error) {
      console.error("Error in getting courses:", error);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // You can adjust this number as needed
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Tablet screen
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600, // Mobile screen
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="relative max-w-7xl mx-auto py-10 my-10">
      <h2 className="text-center text-4xl text-[#1D2027] font-semibold">
        Featured Courses
      </h2>
      <p className="text-center w-full my-4 text-slate-600 px-10">
        Our courses are designed by experts to help you sharpen your focus,
        build confidence, and develop essential skills to stay ahead in the
        industry.
      </p>

      {/* Slick Carousel Wrapper */}
      <Slider {...settings}>
        {courses.map((course) => (
          <div key={course._id} className="px-5" style={{ flex: "0 0 auto" }}>
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
                <p className="text-xs p-2 rounded-md text-[#DF5E7E] bg-[#FCDFE4] inline">
                  {course.category}
                </p>
                <h3
                  className="text-xl mt-3 font-semibold text-[#1D2027] hover:text-[#FE0000] cursor-pointer"
                  onClick={() => navigate(`/course-detail/${course._id}`)}
                >
                  {course.courseTitle}
                </h3>
                <div className="flex justify-between items-center gap-4 text-sm text-slate-600 mt-2">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">Instructor {"•"}</span>
                    <span>{course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <i className="fa-solid fa-user text-[#FE0000]"></i>
                    <span>+{course.enrolledStudent.length > 100 ? course.enrolledStudent.length : 100} Student</span>
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
