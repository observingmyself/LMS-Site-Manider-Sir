import React, { useState } from "react";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { userRegister } from "../../store/auth-slice";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^[6-9]\d{9}$/; // Valid for Indian mobile numbers
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/; // At least 8 chars, 1 uppercase, 1 number

  const validateFields = () => {
    const validationErrors = {};

    if (!emailRegex.test(email)) {
      validationErrors.email = "Invalid email address.";
    }

    if (!mobileRegex.test(mobileNo)) {
      validationErrors.mobileNo = "Invalid mobile number. Must have 10 digits.";
    }

    if (!passwordRegex.test(password)) {
      validationErrors.password =
        "Password must be at least 8 characters, include 1 uppercase letter and 1 number.";
    }

    if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateFields();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({}); // Clear errors if no validation errors
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("mobileNo", mobileNo);
    formData.append("password", password);

    dispatch(userRegister(formData)).then((data) => {
      if (data?.payload?.success) {
        navigate("/login");
        toast.success("Registration Successful");
        setUserName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setMobileNo("");
      }
    });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#F8FAFC]">
      <div className="bg-white mt-28 mb-10 w-92 md:w-96 p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-[#FE0000] text-center mb-6">
          Sign up now
        </h2>
        <form onSubmit={handleSubmit}>
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
              onChange={(e) => setUserName(e.target.value)}
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
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE0000]`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
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
              onChange={(e) => setMobileNo(e.target.value)}
              className={`w-full px-4 py-2 border ${
                errors.mobileNo ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE0000]`}
              placeholder="Enter your mobile phone number"
            />
            {errors.mobileNo && (
              <p className="text-red-500 text-sm mt-1">{errors.mobileNo}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE0000]`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-medium mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-4 py-2 border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE0000]`}
                placeholder="Re-enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
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
          <NavLink to="/login" className="text-[#FE0000] hover:underline">
            Login here
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
