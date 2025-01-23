import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTruckMonster } from "react-icons/fa";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { baseURL } from "../../constant/constant";

const NewsUpdateForm = () => {
  const { id } = useParams();
  const [updateImage, setUpdateImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [contentLoading, setContentLoading] = useState(false);
  const [newsHeadline, setNewsHeadline] = useState("");
  const [newsDescription, setNewsDescription] = useState("");

  const updateImageController = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = new FormData();
    form.append("newsImage", updateImage);
    try {
      const data = await axios.patch(
        `${baseURL}/api/v1/news/updateImage/${id}`,
        form
      );
      if (data) {
        toast.success("Image Updated");
        console.log(data);
        setIsLoading(false);
      } else {
        toast.error("Failed to Update Image");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getSingleNews = async () => {
    try {
      const data = await axios.get(`${baseURL}/api/v1/news/${id}`);
      if (data) {
        setNewsHeadline(data.data.data.newsHeadline);
        setNewsDescription(data.data.data.newsDescription);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSingleNews();
  }, []);

  const updateContentController = async (e) => {
    e.preventDefault();
    setContentLoading(true);
    try {
      const data = await axios.patch(`${baseURL}/api/v1/news/update/${id}`, {
        newsHeadline: newsHeadline,
        newsDescription: newsDescription,
      });
      if (data) {
        toast.success("News Updated");
        setContentLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUpdateImage(file);
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 shadow-md rounded-lg">
      {/* Form 1: Update Image */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Update Image
        </h3>
        <form
          id="updateImgForm"
          onSubmit={(e) => updateImageController(e)}
          encType="multipart/form-data"
          className="space-y-4"
        >
          <div className="flex flex-col">
            <label
              htmlFor="imageInput"
              className="text-gray-600 font-medium mb-2"
            >
              Upload Image:
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              id="imageInput"
              name="image"
              accept="image/*"
              required
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            {isLoading ? "Loading..." : "Update Image"}
          </button>
        </form>
      </div>

      {/* Form 2: Update News Description and Headline */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Update News
        </h3>
        <form
          onSubmit={(e) => updateContentController(e)}
          id="updateNewsForm"
          className="space-y-4"
        >
          <div className="flex flex-col">
            <label
              htmlFor="headlineInput"
              className="text-gray-600 font-medium mb-2"
            >
              Headline:
            </label>
            <input
              type="text"
              value={newsHeadline}
              onChange={(e) => setNewsHeadline(e.target.value)}
              id="headlineInput"
              name="headline"
              placeholder="Enter headline"
              required
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="descriptionInput"
              className="text-gray-600 font-medium mb-2"
            >
              Description:
            </label>
            <textarea
              id="descriptionInput"
              value={newsDescription}
              onChange={(e) => setNewsDescription(e.target.value)}
              name="description"
              rows="5"
              placeholder="Enter description"
              required
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            {contentLoading ? "Loading..." : "Update News"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsUpdateForm;
