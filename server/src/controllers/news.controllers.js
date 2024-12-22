import { News } from "../models/news.models.js"
import { ApiError } from "../utils/apiErrorHandler.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary, deleteMediaFromCloudinary } from "../utils/cloudinary.js"

const CreateNews = asyncHandler(async (req, res) => {
  const { newsHeadline, newsDescription } = req.body
  if ((!newsDescription || !newsHeadline)) {
    throw new ApiError(400, "Please fill all fields")
  }
  const newsImgLocalPath = req.files?.newsImage[0]?.path;
  if (!newsImgLocalPath) {
    throw new ApiError(401, "Img is Require")
  }
  const Image = await uploadOnCloudinary(newsImgLocalPath);

  const news = await News.create({
    newsHeadline,
    newsDescription,
    newsImage: Image?.url
  })
  return res
    .status(200)
    .json(new ApiResponse(201, news, "News has been created Successfully"))
})

const updateNews = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { newsHeadline, newsDescription } = req.body
  if (!id) {
    throw new ApiError(400, "news Id is not provide")
  }

  if ((!newsDescription || !newsHeadline)) {
    throw new ApiError(400, "Please fill all fields")
  }
  const update = await News.findByIdAndUpdate(
    id,
    {
      $set: {
        newsHeadline,
        newsDescription,
      }
    }, {
    new: true,
  }
  )
  if (!update) {
    throw new ApiError(404, "News not found")
  }
  return res
    .status(200)
    .json(new ApiResponse(200, update, "news updated"))
})

// Read all Latest news
const getLatestNews = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 6;
  const sortBy = req.query.sortBy || "createdAt";
  const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
  // The skip variable calculates how many items to skip based on the current page and limit.
  const skip = (page - 1) * limit;
  const news = await News.find().sort({ [sortBy]: sortOrder }).skip(skip).limit(limit);

  // Get the total count of news items for pagination info
  const totalCount = await News.countDocuments();

  return res
    .status(200)
    .json(new ApiResponse(200, { news, totalCount, currentPage: page, totalPages: Math.ceil(totalCount / limit) }, "fecth news scuccessfully"))
})

// Read Single News
const getSingleNews = asyncHandler(async (req, res) => {
  const id = req.params.id
  if (!id) {
    throw new ApiError(400, "News Id is not provide")
  }
  const singleNews = await News.findById(id);
  if (!singleNews) {
    throw new ApiError(404, "News not found")
  }
  return res
    .status(200)
    .json(new ApiResponse(200, singleNews, "News fetched successfully"))
})

// UPDATE NEW IMAGE

const updatenewImage = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const imageLocalPath = req.file?.path;
  if (!imageLocalPath) {
    throw new ApiError(400, "Image not found")
  }

  const data = await News.findById(id);
  if (!data) {
    throw new ApiError(404, "No News found")
  }
  console.log(data.newsImage)

  if (data.newsImage) {
    const publicId = data.newsImage.split("/").pop().split(".")[0];
    await deleteMediaFromCloudinary(publicId)
  }

  const updateImg = await uploadOnCloudinary(imageLocalPath);
  if (!updateImg) {
    throw new ApiError(400, "Failed to upload image")
  }

  const updateNews = await News.findByIdAndUpdate(id, {
    $set: {
      newsImage: updateImg?.url
    }
  }, {
    new: true
  })
  if (!updateNews) {
    throw new ApiError(500, "Something went wrong while updating a news")
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Image has been updated Successfully"))
})

const deleteNews = asyncHandler(async (req, res) => {
  const id = req.params.id
  if (!id) {
    throw new ApiError(400, "News Id is not provide")
  }
  const data = await News.findById(id);
  if (!data) {
    throw new ApiError(404, "No News found")
  }
  console.log(data.newsImage)

  if (data.newsImage) {
    const publicId = data.newsImage.split("/").pop().split(".")[0];
    await deleteMediaFromCloudinary(publicId)
  }

  const deleteNews = await News.findByIdAndDelete(id);
  if (!deleteNews) {
    throw new ApiError(404, "News not found")
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "news has been deleted successfully"))
})


export {
  CreateNews,
  getLatestNews,
  getSingleNews,
  updateNews,
  updatenewImage,
  deleteNews
}