import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password === confirmPassword) {
        const data = await axios.post("/api/v1/user/register", {
          userName: userName,
          email: email,
          mobileNo: mobileNo,
          password: password,
        });
        if (data) {
          console.log(data);
          navigate("/login");
          toast.success(data.data.message);
          setUserName('')
          setEmail('')
          setMobileNo('')
          setPassword('')
        }
      } else {
      }
    } catch (err) {
      toast.error();
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#F8FAFC]">
      {/* <h1 className="text-center  mt-28 text-3xl mb-8 font-bold p-7 w-full bg-[#d8e3f2]">
        Register
      </h1> */}

      <div className="bg-white mt-28 mb-10 w-92 md:w-96 p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-[#FE0000] text-center mb-6">
          Sign up now
        </h2>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          {/* Name Field */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE0000]"
              placeholder="Enter your name"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE0000]"
              placeholder="Enter your email"
            />
          </div>

          {/* Mobile Phone Field */}
          <div className="mb-4">
            <label
              htmlFor="mobile"
              className="block text-gray-700 font-medium mb-2"
            >
              Mobile Phone
            </label>
            <input
              type="tel"
              id="mobile"
              value={mobileNo}
              onChange={(e) => {
                setMobileNo(e.target.value);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE0000]"
              placeholder="Enter your mobile phone number"
            />
          </div>

          {/* Password Field */}
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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

          {/* Remember Me Checkbox */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="mr-2 h-4 w-4 border-gray-300 rounded focus:ring-2 focus:ring-[#FE0000]"
            />
            <label htmlFor="remember" className="text-gray-700">
              Remember me
            </label>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-[#FE0000] text-white font-medium py-2 rounded-lg hover:bg-[#FE0000] transition"
          >
            Signup
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-600 mt-4">
          Already Registered?{" "}
          <a href="/login" className="text-[#FE0000] hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
