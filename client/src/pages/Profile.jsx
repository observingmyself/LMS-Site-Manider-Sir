import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  // console.log(user);
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-92 md:w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
          User Profile
        </h2>

        {/* Profile Image */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
            {user?.profileImg ? (
              <img
                src={user.profileImg}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-gray-500 text-xl">No Image</span>
              </div>
            )}
          </div>
        </div>

        {/* User Details */}
        <div className="space-y-4">
          {/* User Name */}
          <div>
            <label className="block text-gray-700 font-medium">Name:</label>
            <p className="mt-1 capitalize text-lg text-gray-800">
              {user?.userName || "N/A"}
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium">Email:</label>
            <p className="mt-1 text-lg text-gray-800">{user?.email || "N/A"}</p>
          </div>
          {/* Mobile Number */}
          <div>
            <label className="block text-gray-700 font-medium">
              Mobile Number:
            </label>
            <p className="mt-1 text-lg text-gray-800">
              {user?.mobileNo || "N/A"}
            </p>
          </div>
          <div className="flex justify-center gap-2">
            <button
              className="px-3 py-2 rounded-lg flex gap-2 bg-blue-500 font-bold text-gray-100 border border-gray-400 hover:bg-blue-600 transition-all duration-100"
              onClick={() => navigate(`/edit-profile/${user._id}`)}
            >
              Edit
              <box-icon type="solid" color="#fff" name="edit-alt"></box-icon>
            </button>
            {/* <button
              className="px-3 py-2 rounded-lg border bg-red-500 text-white border-gray-400 hover:bg-red-600 transition-all duration-100"
              onClick={() => navigate("/myLearning")}
            >
              My Learnings
            </button>
            <button
              className="px-3 py-2 rounded-lg border bg-yellow-500 text-white border-gray-400 hover:bg-yellow-600 transition-all duration-100"
              onClick={() => navigate("/change-password")}
            >
              Change Pass
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
