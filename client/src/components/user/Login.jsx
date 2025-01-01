import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import GOOGLEPNG from "../../assets/admin/google.png";
import { googleLogin, userLogin } from "../../store/auth-slice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const responseGoogle = async (authResult) => {
    // console.log(authResult)
    dispatch(googleLogin(authResult)).then((data) => {
      // console.log(data);
      if (data?.payload?.success) {
        toast.success("Logged in with Google successfully!");
        navigate("/");
      } else {
        toast.error("Google login failed!");
      }
    });
  };

  const googleAuthLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage(""); // Reset error message before login attempt

    try {
      const result = await dispatch(
        userLogin({
          email: email,
          password: password,
        })
      );

      // Debugging output
      console.log("Result from login:", result);

      if (result?.payload?.success) {
        toast.success(result.payload.message);
        navigate("/");
      } else {
        // Show error message if login fails
        const error = result.payload?.message || "Invalid email or password!";
        setErrorMessage(error); // Set error message state
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMessage("Invalid email or password!");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="w-92 sm:w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-[#FE0000] text-center mb-6">
          Login to your Account
        </h2>
        <form onSubmit={handleLogin}>
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
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Enter your email"
            />
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
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {/* Display error message */}
            {errorMessage && (
              <span className="text-sm text-red-600 mt-2 block">
                {errorMessage}
              </span>
            )}
          </div>
          <div onClick={()=>navigate('/forget-password')} className="my-2 flex text-[#e56a6a] hover:text-[#fd0c0c] hover:underline justify-end">
            Forget Password?
          </div>
          <button
            type="submit"
            className="w-full bg-[#FE0000] text-white py-2 rounded-lg hover:bg-[#581F27] transition duration-300"
          >
            Login
          </button>
          <p className="text-sm text-center text-gray-600 mt-4">
            Don't have an account yet?{" "}
            <NavLink to="/register" className="text-red-600 hover:underline">
              Get it now
            </NavLink>
          </p>
        </form>
        <div className="flex items-center justify-center my-6">
          <span className="border-b border-gray-300 flex-grow"></span>
          <span className="text-sm text-gray-500 px-4">or</span>
          <span className="border-b border-gray-300 flex-grow"></span>
        </div>
        <div className="flex justify-center">
          <button
            className="flex items-center gap-2 bg-white border px-4 py-2 rounded-lg hover:bg-gray-200 transition-all"
            onClick={googleAuthLogin}
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
