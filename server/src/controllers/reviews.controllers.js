import { Review } from "../models/reviews.models.js";
import { ApiError } from "../utils/apiErrorHandler.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
const createReview = asyncHandler(async (req, res) => {
  const { name, message } = req.body;
  if (!(name || message)) {
    throw new ApiError(400, "Please fill name and message filled");
  }
  let imageLocalPath = req.files?.reviewImage?.path;
  let imgUrl;
  if (imageLocalPath) {
    imgUrl = await uploadOnCloudinary(imageLocalPath);
  }
  const data = await Review.create({
    name,
    message,
    reviewImage: imgUrl?.url || ""
  })
  if (!data) {
    throw new ApiError(500, "Something went wrong while creating a review");
  }

  return res
    .status(200)
    .json(new ApiResponse(201, data, "review successfully created"))
})

const getReview = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 7;
  const sortBy = req.query.sortBy || "createdAt"
  const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
  const skip = (page - 1) * limit;
  const data = await Review.find().sort({ [sortBy]: sortOrder }).skip(skip).limit(limit);
  if (!data) {
    throw new ApiError(500, "Something went wrong while fetching the data")
  }
  const totalCount = await Review.countDocuments();
  return res
    .status(200)
    .json(new ApiResponse(200, { data, currentPage: page, totalPage: Math.ceil(totalCount / limit) }, "Successfully fetch data"))
})

const deleteReview = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new ApiError(400, "id not found");
  }
  await Review.findByIdAndDelete(id);
  return res
    .status(200)
    .json(new ApiResponse(200, "Review Successfully deleted"))
})

export {
  createReview,
  getReview,
  deleteReview
}

