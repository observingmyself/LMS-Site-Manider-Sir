import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiErrorHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Course } from "../models/course.models.js"
import { ApiResponse } from "../utils/apiResponse.js"

const registerCourse = asyncHandler(async (req, res) => {
  const { courseTitle, category, coursePrice, description, subtitle, courseLevel, courseDuration, courseLanguage, instructor } = req.body
  if (!(courseTitle || category || coursePrice)) {
    throw new ApiError(401, "This fields are required");
  }
  // upload image
  const courseImage = req.file?.path;
  if (!courseImage) {
    throw new ApiError(401, "Please upload a course image");
  }
  const uploadImg = await uploadOnCloudinary(courseImage);
  if (!uploadImg) {
    throw new ApiError(401, "Failed to upload image");
  }

  // create course
  const createCourse = await Course.create({
    courseTitle, category, coursePrice, description, subtitle, courseLevel, courseDuration, courseLanguage, courseThumbnail: uploadImg?.url, instructor
  })
  if (!createCourse) {
    throw new ApiError(500, "Something went wrong while creating a course")
  }
  return res
    .status(200)
    .json(new ApiResponse(201, createCourse, "Course created Successfully"))
})

const getCourse = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 12;
  const sortBy = req.query.sortBy || "cratedAt";
  const order = req.query.order === "asc" ? 1 : -1;
  const skip = (page - 1) * limit;
  const data = await Course.find().sort({ [sortBy]: order }).skip(skip).limit(limit);
  if (!data) {
    throw new ApiError(404, "No courses found")
  }
  const totalCount = await Course.countDocuments();
  return res.status(200)
    .json(new ApiResponse(200, { data, currentPage: page, totalCount: Math.ceil(totalCount / limit) }, "successfully fetch data"));
})

const getSingleCourse = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new ApiError(401, "Please provide course id")
  }
  const singleData = await Course.findById(id);
  if (!singleData) {
    throw new ApiError(404, "course not found")
  }
  return res
    .status(200)
    .json(new ApiResponse(200, singleData, "successfully fetch data"))
})

const addSyllabus = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new ApiError(401, "Please provide course id")
  }

  const Data = await Course.findById(id)
  if (!Data) {
    throw new ApiError(404, "Course not found")
  }

  // upload on gallery
  const localPath = req.file?.path;
  if (!localPath) {
    throw new ApiError(400, "Please provide syllabus")
  }

  const uploadSyllabus = await uploadOnCloudinary(localPath);
  if (!uploadSyllabus) {
    throw new ApiError(401, "upload file not recievd")
  }

  Data.syllabus.push(uploadSyllabus?.url);
  const savefile = await Data.save({ validateBeforeSave: true });
  if (!savefile) {
    throw new ApiError(500, "something went wrong adding a syllabus file")
  }
  return res.status(200)
    .json(new ApiResponse(200, "Successfully add Syllabus"))
})

export {
  registerCourse,
  getCourse,
  getSingleCourse,
  addSyllabus,
}