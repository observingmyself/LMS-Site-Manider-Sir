import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Fixed 'react-router' to 'react-router-dom'
import { toast } from "react-toastify";
import { baseURL } from "../../constant/constant";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        `${baseURL}/api/v1/user/forget-password`,
        {
          email,
        },
        {
          withCredentials: true,
        }
      );
      if (data.data.success) {
        toast.success(data.data.data);
        setEmail("");
        setIsModalOpen(true); // Open modal on success
        setTimeout(() => {
          navigate("/login");
        }, 10000);
      }
    } catch (e) {
      console.log("Error in forgetting password:", e);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-[#fd0c0c] text-white font-medium py-2 px-4 rounded-md shadow-md transition duration-300"
          >
            Submit
          </button>
        </form>
        <p className="mt-4 text-center text-gray-500 text-sm">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-[#fd0c0c] hover:underline hover:text-red-700"
          >
            Login
          </Link>
        </p>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-lg transform transition-all scale-95">
            <h3 className="text-lg font-bold text-gray-800 text-center mb-4">
              Password Reset Email Sent
            </h3>
            <p className="text-gray-700 text-center">
              We sent a password reset form to your email. Please check and
              reset your password.
            </p>
            <div className="mt-6 text-center">
              <button
                onClick={closeModal}
                className="bg-red-500 hover:bg-[#fd0c0c] text-white font-medium py-2 px-6 rounded-md shadow-md transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
