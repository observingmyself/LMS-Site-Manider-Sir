import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { baseURL } from "../constant/constant";

function CoursePage() {
  const [course, setCourse] = useState([]);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const getAllCourses = async () => {
    try {
      const data = await axios.get(`${baseURL}/api/v1/course`);
      if (data.data.success) {
        setCourse(data.data.data.courses);
      }
    } catch (e) {
      console.log("Error in getting courses", e);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 mt-14">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
        Our Courses
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 md:px-10">
        {course.map((course) => (
          <div
            key={course._id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="relative">
              <img
                src={course.courseThumbnail}
                alt={course.courseTitle}
                className="w-full h-48 object-cover rounded-lg mb-4 transition-all duration-300 hover:opacity-80"
              />
              <div className="absolute bottom-4 left-4 bg-[#DF5E7E] text-[#fff] text-sm font-semibold p-2 rounded-lg">
                {course.category}
              </div>
            </div>
            <div className="px-6 pb-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#2C3E50] mt-4">
                  {course.courseTitle}
                </h2>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <div className="flex items-center gap-2">
                    <box-icon
                      type="solid"
                      name="user"
                      size="sm"
                      color="#FE0000"
                    ></box-icon>
                    <span>{course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>
                      +
                      {course.enrolledStudent > 100
                        ? course.enrolledStudent
                        : "5000"}{" "}
                      Students
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mt-2">{(course.subTitle).slice(0,70)}...</p>
              </div>
              <div className="flex justify-between items-center bottom-2 mt-4">
                <p className="text-xl font-semibold text-[#FE0000]">
                  {user?.enrolledCourse?.includes(course?._id)
                    ? "Enrolled"
                    : `₹${course.coursePrice}`}
                </p>
                {user?.enrolledCourse?.includes(course?._id) ? (
                  <button
                    onClick={() => navigate(`/course-detail/${course?._id}`)}
                    className="py-2 px-4 bg-[#FE0000] text-white rounded-full text-sm font-semibold hover:bg-[#D30000] transition duration-200"
                  >
                    Resources
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`/course-detail/${course?._id}`)}
                    className="py-2 px-4 bg-[#F2F6FC] text-[#FE0000] rounded-full text-sm font-semibold hover:bg-[#F1D6D6] transition duration-200"
                  >
                    Enroll Now
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoursePage;
