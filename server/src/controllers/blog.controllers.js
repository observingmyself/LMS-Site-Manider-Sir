import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiErrorHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Blog } from "../models/blog.models.js";
import { uploadOnCloudinary, deleteMediaFromCloudinary } from "../utils/cloudinary.js";

const createBlog = asyncHandler(async (req, res) => {
  const { BlogTitle, Instructor, Description, BlogType } = req.body;
  if ([BlogTitle, Instructor, Description, BlogType].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required")
  }

  let imageLocalPath;
  if (req.files && Array.isArray(req.files.BlogUrl) && req.files.BlogUrl.length > 0) {
    imageLocalPath = req.files.BlogUrl[0].path;
  }
  if (!imageLocalPath) {
    throw new ApiError(400, "Please provide valid image")
  }
  const Imgurl = await uploadOnCloudinary(imageLocalPath);
  if (!Imgurl) {
    throw new ApiError(500, "Something went wrong while uploading file")
  }
  const data = await Blog.create({
    BlogUrl: Imgurl?.url || "",
    BlogTitle,
    Instructor,
    Description,
    BlogType
  })
  if (!data) {
    throw new ApiError(500, "Something went wrong while creating a blog");
  }
  return res
    .status(200)
    .json(new ApiResponse(201, data, "Blog created Successfully"))
})

const getBlog = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 6;
  const sortBy = req.query.sortBy || "createdAt";
  const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
  const skip = (page - 1) * limit;
  const data = await Blog.find().sort({ [sortBy]: sortOrder }).skip(skip).limit(limit)
  const totalCount = await Blog.countDocuments();
  if (!data) {
    throw new ApiError(500, "Something went wrong to fetch data")
  }
  return res
    .status(200)
    .json(new ApiResponse(200, { data, currentPage: page, totalPage: Math.ceil(totalCount / limit) }, "Successfully fetch Blog data"));
})

const getSingleBlog = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new ApiError(404, "id not found!!");
  }
  const blogData = await Blog.findById(id);
  if (!blogData) {
    throw new ApiError(404, "Blog Data is not avialable in Server");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, blogData, "Successful fetched Blog data"));
})

const updateBlog = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new ApiError(404, "id not found!!");
  }
  const { BlogTitle, Instructor, Description, BlogType } = req.body;
  if ([BlogTitle, Instructor, Description, BlogType].some((field) => field?.trim() === "")) {
    throw new ApiError(401, "All fields are required");
  }
  const update = await Blog.findByIdAndUpdate(
    id,
    {
      $set: {
        BlogTitle, Instructor, Description, BlogType
      }
    },
    {
      new: true,
    }
  )
  if (!update) {
    throw new ApiError(400, "Something went wrong while updating Blog content");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, update, "Blog data has been updated"));
})

const updateBlogImg = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new ApiError(404, "id not found!!");
  }
  const localPath = req.file?.path
  if (!localPath) {
    throw new ApiError(404, "File is not found on your local storage");
  }
  const blogData = await Blog.findById(id);
  if (!blogData) {
    throw new ApiError(404, "Blog Data is not avialable in Server");
  }
  if (blogData?.BlogUrl) {
    const publicId = blogData.BlogUrl.split("/").pop().split(".")[0];
    await deleteMediaFromCloudinary(publicId)
  }

  const data = await uploadOnCloudinary(localPath);
  if (!data) {
    throw new ApiError(500, "Something went wrong while updating Blog Image");
  }
  await Blog.findByIdAndUpdate(id,
    {
      $set: {
        BlogUrl: data?.url
      }
    },
    {
      new: true,
    }
  )
  return res
    .status(200)
    .json(new ApiResponse(200, "update Blog image"))
})

const deleteBlog = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new ApiError(404, "id not found!!");
  }
  const blogData = await Blog.findById(id);
  if (!blogData) {
    throw new ApiError(404, "Blog Data is not avialable in Server");
  }
  if (blogData?.BlogUrl) {
    const publicId = blogData.BlogUrl.split("/").pop().split(".")[0];
    await deleteMediaFromCloudinary(publicId)
  }
  await Blog.findByIdAndDelete(id)
  return res
    .status(200)
    .json(new ApiResponse(200, "Blog has been deleted successfully"));
})

export {
  createBlog,
  getBlog,
  getSingleBlog,
  updateBlog,
  updateBlogImg,
  deleteBlog
}