import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { baseURL } from "../../constant/constant";

const BlogAddForm = () => {
  const [blogImage, setBlogImage] = useState(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [instructor, setInstructor] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogType, setBlogType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Error state
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    const newErrors = {};
    if (!blogImage) newErrors.blogImage = "Blog image is required";
    if (!blogTitle.trim()) newErrors.blogTitle = "Blog title is required";
    if (!instructor.trim())
      newErrors.instructor = "Instructor name is required";
    if (!blogDescription.trim())
      newErrors.blogDescription = "Blog description is required";
    if (!blogType.trim()) newErrors.blogType = "Blog type is required";

    setErrors(newErrors);

    // Stop if there are errors
    if (Object.keys(newErrors).length > 0) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("BlogUrl", blogImage);
    formData.append("BlogTitle", blogTitle);
    formData.append("Instructor", instructor);
    formData.append("Description", blogDescription);
    formData.append("BlogType", blogType);

    try {
      const data = await axios.post(`${baseURL}/api/v1/blog/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (data) {
        // console.log(data);
        toast.success("Blog Added Successfully");
        setIsLoading(false);
        setBlogDescription("");
        setBlogImage(null);
        setBlogTitle("");
        setInstructor("");
        setBlogType("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBlogImage(file);
  };

  return (
    <div className="min-h-screen bg-slate-100 mt-2 flex items-start justify-center">
      <form
        className="bg-white mt-4 shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg w-full"
        onSubmit={(e) => handleSubmit(e)}
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
          Insert New Blog
        </h2>

        {/* Blog Image */}
        <div className="mb-4">
          <label
            htmlFor="blogImage"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Upload Blog Image
          </label>
          <input
            type="file"
            id="blogImage"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {errors.blogImage && (
            <p className="text-red-500 text-xs italic">{errors.blogImage}</p>
          )}
        </div>

        {/* Blog Title */}
        <div className="mb-4">
          <label
            htmlFor="blogTitle"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Blog Title
          </label>
          <input
            type="text"
            id="blogTitle"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
            placeholder="Enter Title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.blogTitle && (
            <p className="text-red-500 text-xs italic">{errors.blogTitle}</p>
          )}
        </div>

        {/* Instructor */}
        <div className="mb-4">
          <label
            htmlFor="instructor"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Instructor
          </label>
          <input
            type="text"
            id="instructor"
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
            placeholder="Enter instructor name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.instructor && (
            <p className="text-red-500 text-xs italic">{errors.instructor}</p>
          )}
        </div>

        {/* Blog Type */}
        <div className="mb-4">
          <label
            htmlFor="blogtype"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Blog Type
          </label>
          <input
            type="text"
            id="blogtype"
            value={blogType}
            onChange={(e) => setBlogType(e.target.value)}
            placeholder="Enter blog type"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.blogType && (
            <p className="text-red-500 text-xs italic">{errors.blogType}</p>
          )}
        </div>

        {/* Blog Description */}
        <div className="mb-6">
          <label
            htmlFor="blogdescription"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Blog Description
          </label>
          <textarea
            id="blogdescription"
            value={blogDescription}
            onChange={(e) => setBlogDescription(e.target.value)}
            placeholder="Enter blog description"
            rows="4"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.blogDescription && (
            <p className="text-red-500 text-xs italic">
              {errors.blogDescription}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isLoading} // Disable button when loading
            className={`${
              isLoading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700"
            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            {isLoading ? (
              <span>
                <svg
                  className="animate-spin h-5 w-5 mr-2 inline-block"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Loading...
              </span>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogAddForm;
