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

export {
  registerCourse
}