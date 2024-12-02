import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiErrorHandler.js"
import { User } from "../models/user.models.js";

const generateToken = async (userId) => {
  try {
    const user = await User.findOne(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false })
    return { accessToken, refreshToken }
  } catch (error) {
    throw new ApiError(500, "something went wrong while to generate a Token")
  }
}

const options = {
  httpOnly: true,
  secure: true
}

const Register = asyncHandler(async (req, res) => {
  const { userName, email, mobileNo, password } = req.body;
  if ([userName, email, mobileNo, password].some((field) => field?.trim() == "")) {
    throw new ApiError(400, "All fields are Required");
  }
  const existingUser = await User.findOne({
    $or: [{ email: email }, { mobileNo: mobileNo }]
  });

  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const userCreate = await User.create({
    userName,
    email,
    mobileNo,
    password,
  })

  const createUser = await User.findById(userCreate._id).select("-password -refreshToken");

  if (!createUser) {
    throw new ApiError(500, "Something went wrong while creating a user Account")
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createUser, "User has been Registerd Successfully"))
})

const login = asyncHandler(async (req, res) => {
  const { email, mobileNo, password } = req.body;

  if (!(email || mobileNo)) {
    throw new ApiError(400, "Email or Mobile Number is required")
  }

  const checkUser = await User.findOne({
    $or: [{ email: email }, { mobileNo: mobileNo }]
  })

  if (!checkUser) {
    throw new ApiError(400, "Invalid Email or Mobile Number")
  }

  const isPasswordValid = await checkUser.comparePassword(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid Password")
  }

  // provide token
  const { accessToken, refreshToken } = await generateToken(checkUser._id);
  const loggedInUser = await User.findById(checkUser._id).select("-password -refreshToken")
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User has been logged in Successfully"))
})

const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        refreshToken: null,
      }
    },
    {
      new: true
    })
  return res
    .status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json(new ApiResponse(200, {}, "User has been logged out Successfully"))
})

const getProfile = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User Profile has been fetched Successfully"))
})

const updateProfile = asyncHandler(async (req, res) => {
  const { userName, email, mobileNo } = req.body;
  if (!userName || !email || !mobileNo) {
    throw new ApiError(400, "These fields are Required");
  }
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        userName,
        email,
        mobileNo
      }
    },
    {
      new: true
    }
  ).select("-password");
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User Profile has been updated Successfully"))
})

export {
  Register,
  login,
  logout,
  getProfile,
  updateProfile
}