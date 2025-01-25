import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { checkAuth } from "../store/auth-slice";
import { baseURL } from "../constant/constant";

const EditProfilePage = () => {
  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    mobileNo: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [profileImg, setProfileImg] = useState(null);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      setFormData({
        email: user.email,
        userName: user.userName,
        mobileNo: user.mobileNo,
      });
    }
  }, [user, isAuthenticated]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !formData.email.trim() ||
        !formData.userName.trim() ||
        !formData.mobileNo.trim()
      )
        return toast.error("These fields are required");
      const data = await axios.patch(
        `${baseURL}/api/v1/user/updateProfile`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (data) {
        toast.success("Profile Updated");
      }
    } catch (err) {
      toast.error("Try Again Later");
      console.log("err in updating profile", err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImg(file);
  };
  const handleImageUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formdata = new FormData();
    formdata.append("profileImg", profileImg);
    try {
      const data = await axios.patch(
        `${baseURL}/api/v1/user/updateImg`,
        formdata,
        {
          withCredentials: true,
        }
      );
      if (data) {
        // console.log(data);
        toast.success("Profile Image Updated");
        setProfileImg(null);
        dispatch(checkAuth());
      }
    } catch (err) {
      toast.error("Try Again Later");
      console.log("err in updating profile image", err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen mt-12 px-4 flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900">
          Update Profile
        </h2>
        <div className="relative items-center flex justify-center">
          {/* Circular Input */}
          <label htmlFor="profileImg" className="cursor-pointer">
            <form onSubmit={handleImageUpdate}>
              <div
                className="w-32 h-32 overflow-hidden rounded-full bg-gray-200 flex items-center justify-center relative border border-gray-300 shadow-md"
                style={{
                  backgroundImage: `url(${profileImg || ""})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {!profileImg && (
                  <span className="text-gray-500 text-sm">
                    <img src={user?.profileImg} className="h-32" alt="" />
                  </span>
                )}

                {/* Overlay "+" Icon */}
              </div>
              <div className="absolute bottom-14  w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-lg shadow-md">
                +
              </div>
              <button
                type="submit"
                className="my-2 px-2 py-2 bg-red-500 rounded-lg text-white hover:bg-red-600 transition-all duration-200"
              >
                {isLoading ? "Loading..." : "Update Image"}
              </button>
            </form>
            {/* Hidden Input */}
            <input
              id="profileImg"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter your email"
            />
          </div>

          {/* UserName Field */}
          <div>
            <label
              htmlFor="userName"
              className="block text-gray-700 font-medium mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter your username"
            />
          </div>

          {/* Mobile Number Field */}
          <div>
            <label
              htmlFor="mobileNo"
              className="block text-gray-700 font-medium mb-1"
            >
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobileNo"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter your mobile number"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-md shadow-sm hover:bg-red-600 transition duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
