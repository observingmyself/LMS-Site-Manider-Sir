import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("/api/v1/user/login", {
        email: email,
        password: password,
      });
      if (data) {
        navigate("/");
        console.log(data);
        localStorage.setItem(
          "token",
          JSON.stringify({
            isLoggedIn: true,
            token: data.data.data.accessToken,
          })
        );
        toast.success(data.data.message);
        setEmail("");
        setPassword("");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-center mt-5 text-3xl mb-8 font-bold p-7 w-full bg-[#d8e3f2]">
        Login
      </h1>
      <div className="w-92 sm:w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-[#FE0000] text-center mb-6">
          Login to your Account
        </h2>
        <form onSubmit={(e) => handleLogin(e)}>
          {/* Email Input */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Toggle input type
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Enter your password"
              />
              {/* Eye icon */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-sm text-gray-600">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="text-sm text-[#FE0000] hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button className="w-full bg-[#FE0000] text-white py-2 rounded-lg hover:bg-[#581F27] transition duration-300">
         Login
          </button>

          {/* Register Link */}
          <p className="text-sm text-center text-gray-600 mt-4">
            Don't have an account yet?{" "}
            <a href="/register" className="text-red-600 hover:underline">
              Get it now
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
