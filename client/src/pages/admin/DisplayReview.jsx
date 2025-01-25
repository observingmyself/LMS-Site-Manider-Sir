import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { baseURL } from "../../constant/constant";

const DisplayReview = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);

  const getAllReviews = async (page = 1) => {
    try {
      const data = await axios.get(
        `${baseURL}/api/v1/review?page=${page}&limit=15`,
        {
          withCredentials: true,
        }
      );
      if (data) {
        setReviews(data.data.data.data);
        // console.log(data.data.data.Pages)
        setPages(data.data.data.Pages);
        setCurrentPage(page);
      }
    } catch (e) {
      console.log("err in getting reviews", e);
    }
  };
  const handleDelete = async (id) => {
    try {
      const data = await axios.delete(`${baseURL}/api/v1/review/${id}`, {
        withCredentials: true,
      });
      getAllReviews();
      if (data.data.success) {
        toast.success("Deleted");
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getAllReviews();
  }, []);
  return (
    <div>
      <h2 className="text-center text-2xl font-bold mb-4">Reviews</h2>
      <div className="overflow-x-auto w-screen md:px-10">
        <table className="table-auto text-slate-700 w-full bg-white border-collapse min-w-[800px]">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-3 border">S.No</th>
              <th className="px-4 py-3 border">Username</th>
              <th className="px-4 py-3 border">Message</th>
              <th className="px-4 py-3 border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {reviews?.map((review, index) => (
              <tr
                key={review?._id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition`}
              >
                <td className="px-4 py-3 border text-center">
                  {(currentPage - 1) * 10 + index + 1}
                </td>
                <td className="px-4 py-3 border">{review?.name}</td>
                <td className="px-4 py-3 border">{review?.message}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="flex items-center justify-center text-white mx-auto rounded-sm group"
                  >
                    <span className="group-hover:hidden">
                      <box-icon name="trash" color="#fc2121"></box-icon>
                    </span>
                    <span className="hidden group-hover:block">
                      <box-icon
                        name="trash"
                        animation="tada"
                        flip="horizontal"
                        color="red"
                      ></box-icon>
                    </span>
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
                onClick={() => getAllReviews(index + 1)}
              >
                {index + 1}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default DisplayReview;
