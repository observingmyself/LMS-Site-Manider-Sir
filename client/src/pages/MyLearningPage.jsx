import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { baseURL } from "../constant/constant";

const MyLearningPage = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const getAllCourses = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/v1/course`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setCourses(response.data.data.courses);
      }
    } catch (error) {
      console.error("Error in getting courses", error);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  let userCourses = courses.filter((course) => {
    user?.enrolledCourse?.includes(course._id);
  });

  return (
    <div className="bg-gray-100 min-h-screen p-6 mt-20">
      <h1 className="text-2xl font-bold text-center mb-8 text-gray-900">
        My Purchased Courses
      </h1>
      <div className=" relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {userCourses.length > 0 ? (
          <>
            {courses.map((course) =>
              user?.enrolledCourse?.includes(course._id) ? (
                <div
                  key={course._id}
                  className="bg-white shadow-lg rounded-lg hover:shadow-2xl transition duration-300 "
                >
                  {/* Course Thumbnail */}
                  <img
                    src={course.courseThumbnail}
                    alt={course.courseTitle}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-28 left-5 bg-[#DF5E7E] text-[#fff] text-sm font-semibold p-2 rounded-lg">
                    {course.category}
                  </div>
                  {/* Course Info */}
                  <div className="p-4">
                    <h2 className="text-xl font-semibold">
                      {course.courseTitle}
                    </h2>
                    <p className="text-gray-700 text-sm mb-2">
                      {course.subTitle}
                    </p>
                    <p className="text-gray-500 text-sm mb-2">
                      <span className="font-medium">Instructor:</span>{" "}
                      {course.instructor}
                    </p>
                    {/* <p className="text-gray-500 text-sm mb-4">
                  <span className="font-medium">Category:</span>{" "}
                  {course.category}
                </p> */}

                    {/* Go to Course Button */}
                    <div className="flex justify-center text-center">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                        onClick={() => navigate(`/course-detail/${course._id}`)}
                      >
                        Go to Course
                      </button>
                    </div>
                  </div>
                </div>
              ) : null
            )}
          </>
        ) : (
          <>
            <div className="mt-10 flex justify-center items-center col-span-4 flex-col">
              <h1 className="text-gray-800 font-semibold text-center text-xl md:text-2xl mb-4">
                You didn't have Purchased Courses
              </h1>
              <button
                className="bg-red-500 hover:bg-red-600 text-gray-50 font-semibold border-none rounded-lg p-2 text-center flex justify-center items-center px-4"
                onClick={() => navigate("/courses")}
              >
                View Courses{" "}
                <box-icon name="right-arrow-alt" color="#fff"></box-icon>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyLearningPage;
