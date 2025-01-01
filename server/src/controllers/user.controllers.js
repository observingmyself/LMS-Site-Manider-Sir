import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiErrorHandler.js";
import axios from "axios";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { sendEmail } from "../utils/mailService.js";
import JWT from "jsonwebtoken";
import { oauth2client } from "../utils/googleConfig.js";

const generateToken = async (userId) => {
  try {
    const user = await User.findOne(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "something went wrong while to generate a Token");
  }
};

const options = {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
};

const Register = asyncHandler(async (req, res) => {
  const { userName, email, mobileNo, password, role } = req.body;
  if (
    [userName, email, mobileNo, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are Required");
  }

  const existingUser = await User.findOne({
    $or: [{ email: email }, { mobileNo: mobileNo }],
  });

  // Check Existing User
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  // upload Profile Img
  let profileImgLocalPath;
  // first check upcoming file and then check profileImg is Array or not than after check is length is grater than 0;
  if (
    req.files &&
    Array.isArray(req.files.profileImg) &&
    req.files.profileImg.length > 0
  ) {
    profileImgLocalPath = req.files.profileImg[0].path;
  }
  const ProfilePic = await uploadOnCloudinary(profileImgLocalPath);

  // Create User
  const userCreate = await User.create({
    userName,
    email,
    mobileNo,
    password,
    profileImg: ProfilePic?.url || "",
    role,
  });

  const createUser = await User.findById(userCreate._id).select(
    "-password -refreshToken"
  );

  if (!createUser) {
    throw new ApiError(
      500,
      "Something went wrong while creating a user Account"
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createUser, "Registerd Successfully"));
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "Email or Mobile Number is required");
  }

  const checkUser = await User.findOne({
    $or: [{ email: email }, { mobileNo: email }],
  });

  if (!checkUser) {
    throw new ApiError(400, "Invalid Email or Mobile Number");
  }

  const isPasswordValid = await checkUser.comparePassword(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid Password");
  }

  // provide token
  const { accessToken, refreshToken } = await generateToken(checkUser._id);
  const loggedInUser = await User.findById(checkUser._id).select(
    "-password -refreshToken"
  );
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "logged in Successfully"
      )
    );
});

const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        refreshToken: null,
      },
    },
    {
      new: true,
    }
  );
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User has been logged out Successfully"));
});

const refreshAndAccessToken = asyncHandler(async (req, res) => {
  const IncomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!IncomingRefreshToken) {
    throw new ApiError(401, "unauthorized User");
  }
  try {
    // decode token
    const decodedToken = JWT.verify(
      IncomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY
    );

    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "Invalid Refresh token");
    }

    if (IncomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    // generate new token
    const { accessToken, refreshToken } = await generateToken(user?._id);
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken },
          "your Access Token is Refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid RefreshToken");
  }
});

const getProfile = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        req.user,
        "User Profile has been fetched Successfully"
      )
    );
});

const getAllUser = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 20;
  const sortBy = req.query.sortBy || "createdAt";
  const order = req.query.order === "desc" ? "-1" : "1";
  const skip = (page - 1) * limit;
  const users = await User.find()
    .sort({ [sortBy]: order })
    .skip(skip)
    .limit(limit);
  if (!users) {
    throw new ApiError(404, "No User found");
  }
  return res.status(200).json(new ApiResponse(200, users, "fetch all users"));
});

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
        mobileNo,
      },
    },
    {
      new: true,
    }
  ).select("-password");
  return res
    .status(200)
    .json(
      new ApiResponse(200, user, "User Profile has been updated Successfully")
    );
});

const updateProfileImg = asyncHandler(async (req, res) => {
  let profileImgLocalPath = req.file?.path;
  if (!profileImgLocalPath) {
    throw new ApiError(400, "Profile Image is Required");
  }
  const updateImg = await uploadOnCloudinary(profileImgLocalPath);
  if (!updateImg.url) {
    throw new ApiError(400, "Failed to upload Profile Image");
  }
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { profileImg: updateImg?.url },
    },
    {
      new: true,
    }
  );
  return res
    .status(200)
    .json(new ApiResponse(200, "Profile Image updated Successfulluy"));
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User Not Found");
  }
  const isPasswordValid = await user.comparePassword(oldPassword);
  if (!isPasswordValid) {
    throw new ApiError(409, "Old Password is Incorrect");
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, "Password Changed Successfully"));
});

const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiError(400, "Email is Required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "Please provid valid email");
  }
  const restPasswordtoken = JWT.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.REST_PASSWORD_SECRET_KEY,
    {
      expiresIn: process.env.REST_PASSWORD_EXPIRY,
    }
  );
  const resetField = `${process.env.DOMAIN_NAME}/reset-password/${restPasswordtoken}`;
  const userEmail = user.email;

  await sendEmail({ userEmail, resetField });
  return res
    .status(200)
    .json(new ApiResponse(200, "password link send successfully"));
});

const resetPassword = asyncHandler(async (req, res) => {
  const { newPassword } = req.body;
  const { token } = req.params;

  if (!newPassword || !token) {
    throw new ApiError(400, "Please provide new password and token");
  }

  const decodedToken = JWT.verify(token, process.env.REST_PASSWORD_SECRET_KEY);
  if (!decodedToken) {
    throw new ApiError(401, "Invalid Token");
  }
  const user = await User.findOne({ _id: decodedToken._id }).select(
    "-password -refreshToken"
  );
  user.password = newPassword;
  if (!user) {
    throw new ApiError(404, "User Not Found");
  }
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, "Password change successfully"));
});

const googleLogin = asyncHandler(async (req, res) => {
  const { code } = req.query;
  if (!code) {
    throw new ApiError(400, "Code is required");
  }

  const googleResponse = await oauth2client.getToken(code);
  oauth2client.setCredentials(googleResponse.tokens);

  const userResponse = await axios.get(`
    https://www.googleapis.com/oauth2/v1/userinfo?alt=json`, {
    headers: {
      "Authorization": `Bearer ${googleResponse.tokens.access_token}`,
    }
  });
  const { name, email, picture } = userResponse.data;
  let user = await User.findOne({ email: email });
  if (!user) {
    user = await User.create({
      userName: name,
      email: email,
      profileImg: picture,
      password: "google-password",
    });
  }
  // console.log(userResponse);
  const { _id } = user;
  const { accessToken, refreshToken } = await generateToken(_id);
  const loggedInUser = await User.findById(_id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "Logged in Successfully"
      )
    );
});





export {
  Register,
  login,
  logout,
  getAllUser,
  getProfile,
  changePassword,
  resetPassword,
  forgetPassword,
  updateProfile,
  updateProfileImg,
  refreshAndAccessToken,
  googleLogin,
};
