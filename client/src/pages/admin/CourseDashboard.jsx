import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { baseURL } from "../../constant/constant";

const CourseDashboard = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const getAllCourses = async (page = 1) => {
    try {
      const data = await axios.get(
        `${baseURL}/api/v1/course/courses?page=${page}`,
        {
          withCredentials: true,
        }
      );
      if (data.data.success) {
        // console.log(data)
        setCourses(data.data.data.data);
        setPages(data.data.data.Pages);
        setCurrentPage(page);
      }
    } catch (e) {
      console.log("Error in getting courses", e);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  const handlePublish = async (id, publish) => {
    try {
      const data = await axios.patch(
        `${baseURL}/api/v1/course/togglePublish/${id}?publish=${!publish}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (data) {
        getAllCourses(currentPage); // Refresh current page after toggling publish
      }
    } catch (e) {
      console.log("Error in publishing", e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="container mx-auto bg-white shadow-md rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
            E-Learning
          </h1>
          <button
            onClick={() => navigate("/admin/dashboard/add-course")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-md shadow-md transition"
          >
            Create New Course
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2 sm:p-4 border border-gray-300">Title</th>
                <th className="p-2 sm:p-4 border border-gray-300">Price</th>
                <th className="p-2 sm:p-4 border border-gray-300">Status</th>
                <th className="p-2 sm:p-4 border border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {courses?.map((course, index) => (
                <tr
                  key={course?._id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition`}
                >
                  <td className="p-2 sm:p-4 border border-gray-300">
                    {course?.courseTitle}
                  </td>
                  <td className="p-2 sm:p-4 border border-gray-300">
                    {course?.coursePrice}
                  </td>
                  <td
                    onClick={() => handlePublish(course._id, course.isPublish)}
                    className="p-2 sm:p-4 border cursor-pointer border-gray-300"
                  >
                    {course?.isPublish ? (
                      <span className="bg-green-100 text-green-600 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                        Publish
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-600 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                        Unpublish
                      </span>
                    )}
                  </td>
                  <td className="p-2 sm:p-4 border border-gray-300">
                    <button
                      onClick={() =>
                        navigate(`/admin/dashboard/update-course/${course._id}`)
                      }
                      className="text-blue-500 hover:text-blue-700 transition text-xs sm:text-sm"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-center mt-6">
          <nav>
            <ul className="flex list-none">
              {Array.from({ length: pages }, (_, index) => (
                <li
                  key={index + 1}
                  className={`mx-1 px-3 py-1 border rounded-md cursor-pointer ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  onClick={() => getAllCourses(index + 1)}
                >
                  {index + 1}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default CourseDashboard;
