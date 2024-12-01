import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiErrorHandler.js";
import JWT from "jsonwebtoken";

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    throw new ApiError(401, "Unauthorized Request");
  }
  const decodedToken = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
  if (!decodedToken) {
    throw new ApiError(401, "Unauthorized Request, Token is not Valid");
  }
  const user = await User.findById(decodedToken._id).select("-password -refreshToken");
  req.user = user;
  next();

})
export default verifyJWT;