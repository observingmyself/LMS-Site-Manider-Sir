import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DisplayNews = () => {
  const [news, setNews] = useState([]);

  const getAllNews = async () => {
    try {
      const data = await axios.get("/api/v1/news");
      if (data) {
        setNews(data.data.data);
        // console.log(data)
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllNews();
  }, []);

  const handleDelete = async (id) => {
    try {
      const data = await axios.delete(`/api/v1/news/delete/${id}`);
      if (data) {
        getAllNews();
        toast.success("News Deleted");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="px-4 lg:px-8 h-screen w-screen">
      <h4 className="text-2xl lg:text-3xl font-semibold text-center mb-6 text-gray-800">
        Post Table
      </h4>
      {/* Wrapper with overflow-x-auto */}
      <div className="overflow-x-auto border rounded-lg shadow-lg">
        <table className="table-auto w-full bg-white border-collapse min-w-[800px]">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-3 border">S.No.</th>
              <th className="px-4 py-3 border">Post Image</th>
              <th className="px-4 py-3 border">Post Name</th>
              <th className="px-4 py-3 border">Description</th>
              <th className="px-4 py-3 border">Date</th>
              <th className="px-4 py-3 border">Remove Action</th>
              <th className="px-4 py-3 border">Update Action</th>
            </tr>
          </thead>
          <tbody>
            {news.map((news, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td className="px-4 py-2 border">
                  <img
                    src={news.newsImage}
                    alt=""
                    className="mx-auto h-[90px]"
                  />
                </td>
                <td claxssName="px-4 py-2 border">{news.newsHeadline}</td>
                <td claxssName="px-4 py-2 border">{news.newsDescription}</td>
                <td className="px-4 py-2 border">
                  {new Date(news.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleDelete(news._id)}
                    className="px-2 py-2 bg-[#fd0c0c] hover:bg-[brown] text-white mx-auto rounded-sm"
                  >
                    Delete
                  </button>
                </td>
                <td className="px-4 py-2 border">
                  <button className="px-2 py-2 bg-blue-500 hover:bg-blue-700 text-white mx-auto rounded-sm">
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayNews;
