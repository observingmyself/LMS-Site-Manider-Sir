import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userLogin } from "../../store/auth-slice";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../../login with google/api";
import GOOGLEPNG from "../../assets/admin/google.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const result = await googleAuth(authResult["code"]);
        console.log(result); // Debug Google Auth Response
      }
    } catch (err) {
      console.log("responseGoogle", err);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });
  

  function handleLogin(event) {
    event.preventDefault();
    dispatch(
      userLogin({
        email: email,
        password: password,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success(data.payload.message);
      }
    });
  }

  return (
    <div className="flex mt-10 flex-col justify-center items-center h-screen bg-gray-100">
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
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Enter your password"
              />
              {invalidPassword && (
                <span className="text-sm text-[#fd0c0c]">
                  {invalidPassword}
                </span>
              )}
              {/* Eye icon */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
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
          <button
            type="submit"
            className="w-full bg-[#FE0000] text-white py-2 rounded-lg hover:bg-[#581F27] transition duration-300"
          >
            Login
          </button>

          {/* Register Link */}
          <p className="text-sm text-center text-gray-600 mt-4">
            Don't have an account yet?{" "}
            <NavLink to="/register" className="text-red-600 hover:underline">
              Get it now
            </NavLink>
          </p>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center my-6">
          <span className="border-b border-gray-300 flex-grow"></span>
          <span className="text-sm text-gray-500 px-4">or</span>
          <span className="border-b border-gray-300 flex-grow"></span>
        </div>

        {/* Google Login Button */}
        <div className="flex justify-center">
          <button
            className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all duration-300"
            onClick={googleLogin}
          >
            <img src={GOOGLEPNG} alt="google logo" className="h-6" />
            <span className="text-sm font-medium">Login with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
