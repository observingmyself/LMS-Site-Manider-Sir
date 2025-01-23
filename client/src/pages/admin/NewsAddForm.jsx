import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { baseURL } from "../../constant/constant";

const NewsAddForm = () => {
  const [newsImage, setNewsImage] = useState(null);
  const [newsHeadline, setNewsHeadline] = useState("");
  const [newsDescription, setNewsDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [errors, setErrors] = useState({
    newsImage: "",
    newsHeadline: "",
    newsDescription: "",
  });

  const validation = () => {
    let formErrors = {
      newsImage: newsImage ? "" : "Upload Image",
      newsHeadline: newsHeadline.trim() ? "" : "Enter Headline", // Trim spaces before validating
      newsDescription: newsDescription.trim() ? "" : "Enter Description", // Trim spaces before validating
    };
    setErrors(formErrors);
    return !Object.values(formErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!validation()) return;

    const formData = new FormData();
    formData.append("newsImage", newsImage);
    formData.append("newsHeadline", newsHeadline);
    formData.append("newsDescription", newsDescription);

    try {
      setIsLoading(true); // Set loading to true before starting upload
      const { data } = await axios.post(
        `${baseURL}/api/v1/news/createNews`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data) {
        toast.success("News created successfully");
        setNewsImage(null);
        setNewsHeadline("");
        setNewsDescription("");
      } else {
        toast.error("Unable to create news");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while creating the news.");
    } finally {
      setIsLoading(false); // Reset loading state after upload
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewsImage(file);
  };

  return (
    <div className="min-h-screen bg-slate-100 mt-2 flex items-start justify-center">
      <form
        className="bg-white mt-4 shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg w-full"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
          Insert News Form
        </h2>

        {/* News Image */}
        <div className="mb-4">
          <label
            htmlFor="newsImage"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Upload News Image
          </label>
          <input
            type="file"
            id="newsImage"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {errors.newsImage && (
            <p className="text-red-500 text-sm mt-1">{errors.newsImage}</p>
          )}
        </div>

        {/* News Headline */}
        <div className="mb-4">
          <label
            htmlFor="newsHeadline"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            News Headline
          </label>
          <input
            type="text"
            id="newsHeadline"
            value={newsHeadline}
            onChange={(e) => setNewsHeadline(e.target.value)}
            placeholder="Enter headline"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.newsHeadline && (
            <p className="text-red-500 text-sm mt-1">{errors.newsHeadline}</p>
          )}
        </div>

        {/* News Description */}
        <div className="mb-6">
          <label
            htmlFor="newsDescription"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            News Description
          </label>
          <textarea
            id="newsDescription"
            value={newsDescription}
            onChange={(e) => setNewsDescription(e.target.value)}
            placeholder="Enter news description"
            rows="4"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.newsDescription && (
            <p className="text-red-500 text-sm mt-1">
              {errors.newsDescription}
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

export default NewsAddForm;
