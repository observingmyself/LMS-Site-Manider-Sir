import { News } from "../models/news.models.js"
import { ApiError } from "../utils/apiErrorHandler.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const newNews = asyncHandler(async (req, res) => {
  const { newsHeadline, newsDescription } = req.body
  if (!(newsDescription || newsHeadline)) {
    throw new ApiError(400, "Please fill all fields")
  }
  const newsImgLocalPath = req.files?.Image[0]?.path;
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
    .json(new ApiResponse(201, news, "News has bee\n created Successfully"))
})

const updateNews = asyncHandler(async (req, res) => {
  const id = req.params;
  if (!id) {
    throw new ApiError(400, "news Id is not provide")
  }

  const { newsHeadline, newsDescription } = req.body
  if (!(newsDescription || newsHeadline)) {
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
    .json(200, "news is updated")
})

// Read all Latest news
const getLatestNews = asyncHandler(async (req, res) => {
  const news = await News.find().sort({ createdAt: -1 }).limit(5);
  return res
    .status(200)
    .json(new ApiResponse(200, news, "fecth news scuccessfully"))
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
  const imageLocalPath = req.file;
  if (!imageLocalPath) {
    throw new ApiError(400, "Image not found")
  }
  const updateImg = await uploadOnCloudinary(imageLocalPath);
  const updateNews = await News.findByIdAndUpdate(id, {
    $set: {
      newsImage: updateImg.url
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
  const deleteNews = await News.findByIdAndDelete(id);
  if (!deleteNews) {
    throw new ApiError(404, "News not found")
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "news has been deleted successfully"))
})


export {
  newNews,
  getLatestNews,
  getSingleNews,
  updateNews,
  updatenewImage,
  deleteNews
}