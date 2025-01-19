import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiErrorHandler.js"
import { uploadOnCloudinary, deleteMediaFromCloudinary } from "../utils/cloudinary.js";
import { Course } from "../models/course.models.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { deleteFileFromGoogleDrive, uploadToGoogleDrive } from "../utils/googleDrive.js";
import { PPT, EBook } from "../models/ebook.models.js"

const registerCourse = asyncHandler(async (req, res) => {
  const { courseTitle, category, coursePrice, description, subTitle, courseLevel, courseDuration, courseLanguage, instructor } = req.body
  if ((!courseTitle || !category || !coursePrice)) {
    throw new ApiError(401, "This fields are required");
  }
  // upload image
  const courseImage = req.file?.path;
  // console.log(courseImage)
  if (!courseImage) {
    throw new ApiError(401, "Please upload a course image");
  }
  const uploadImg = await uploadOnCloudinary(courseImage);
  // console.log(uploadImg.url)
  if (!uploadImg) {
    throw new ApiError(401, "Failed to upload image");
  }

  // create course
  const createCourse = await Course.create({
    courseTitle, category, coursePrice, description, subTitle, courseLevel, courseDuration, courseLanguage, courseThumbnail: uploadImg?.url, instructor
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
  const sortBy = req.query.sortBy || "createdAt";
  const order = req.query.order === "asc" ? 1 : -1;
  const skip = (page - 1) * limit;
  const data = await Course.find().sort({ [sortBy]: order }).skip(skip).limit(limit);
  if (!data) {
    throw new ApiError(404, "No courses found")
  }
  const totalCount = await Course.countDocuments();
  return res.status(200)
    .json(new ApiResponse(200, { data, currentPage: page, Pages: Math.ceil(totalCount / limit) }, "successfully fetch data"));
})

const getSingleCourse = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new ApiError(401, "Please provide course id")
  }
  const singleData = await Course.findById(id)
  // console.log(singleData)
  if (!singleData) {
    throw new ApiError(404, "course not found")
  }
  return res
    .status(200)
    .json(new ApiResponse(200, singleData, "successfully fetch data"))
})

// update Course 
const updateCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { courseTitle, category, coursePrice, description, subTitle, courseLevel, courseDuration, courseLanguage, instructor } = req.body
  if ((!courseTitle || !category || !coursePrice)) {
    throw new ApiError(401, "This fields are required");
  }
  if (!courseId) {
    throw new ApiError(401, "Please provide course id")
  }

  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, "Course not found")
  }

  const data = await Course.findByIdAndUpdate(courseId, {
    $set: {
      courseTitle, category, coursePrice, description, subTitle, courseLevel, courseDuration, courseLanguage, instructor
    }
  }, {
    new: true,
  })

  if (!data) {
    throw new ApiError(404, "Course not found")
  }

  return res
    .status(200)
    .json(new ApiResponse(200, data, "successfully update data"))
})

const updateCourseImg = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  if (!courseId) {
    throw new ApiError(401, "Please provide course id")
  }
  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, "Course not found")
  }

  const localFilePath = req.file?.path;
  if (!localFilePath) {
    throw new ApiError(401, "Please provide image")
  }
  const upload = await uploadOnCloudinary(localFilePath);
  if (!upload) {
    throw new ApiError(401, "Failed to upload image")
  }

  if (course?.courseThumbnail) {
    const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
    await deleteMediaFromCloudinary(publicId)
  }

  await Course.findByIdAndUpdate(courseId, {
    $set: {
      courseThumbnail: upload?.url,
    }
  }, {
    new: true
  })
  return res
    .status(200)
    .json(new ApiResponse(200, "successfully update course image"))

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

  const folderId = process.env.SYLLABUS_FOLDERID
  const uploadSyllabus = await uploadToGoogleDrive(localPath, folderId);
  if (!uploadSyllabus) {
    throw new ApiError(401, "upload file not recievd")
  }

  Data.syllabus.push({ fileName: req.file?.originalname, fileId: uploadSyllabus?.fileId, fileUrl: uploadSyllabus?.fileUrl });
  const savefile = await Data.save({ validateBeforeSave: true });
  if (!savefile) {
    throw new ApiError(500, "something went wrong adding a syllabus file")
  }
  return res.status(200)
    .json(new ApiResponse(200, "Successfully add Syllabus"))
})

const deleteSyllabus = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { syllabusId } = req.params
  if (!id) {
    throw new ApiError(401, "Please provide course id")
  }
  const Data = await Course.findById(id)
  if (!Data) {
    throw new ApiError(404, "Course not found")
  }
  // console.log(Data.syllabus)
  const fieldId = Data.syllabus.id(syllabusId)
  if (!fieldId) {
    throw new ApiError(404, "Syllabus not found")
  }
  await deleteFileFromGoogleDrive(fieldId.fileId)
  await Course.updateOne(
    { _id: id },
    {
      $pull: {
        syllabus: { _id: syllabusId }
      }
    })
  return res.status(200)
    .json(new ApiResponse(200, "Successfully delete Syllabus"))
})

const addPPT = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const id = req.params.id;
  if (!title || !id) {
    throw new ApiError(400, "provide PPt name or ID");
  }

  const data = await Course.findById(id);
  if (!data) {
    throw new ApiError(404, "Course not found!!");
  }

  const localFilePath = req.file?.path;
  if (!localFilePath) {
    throw new ApiError(400, "Please provide valid file")
  }

  const uploadfile = await uploadToGoogleDrive(localFilePath, process.env.PPT_FOLDERID);
  // console.log(uploadfile)
  if (!uploadfile) {
    throw new ApiError(500, "failed to upload on drive");
  }

  const ppt = await PPT.create({
    title: title,
    fileId: uploadfile?.fileId,
    pptUrl: uploadfile?.fileUrl
  })

  if (!ppt) {
    throw new ApiError(500, "Failed to create ppt")
  }
  await data.ppts.push(ppt._id);
  await data.save();
  return res.status(200)
    .json(new ApiResponse(201, data, "successfully create PPT"))
})

const getCoursePPT = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  if (!courseId) {
    throw new ApiError(400, "Please provide course id")
  }
  const course = await Course.findById(courseId).populate("ppts");
  // console.log(course)
  if (!course) {
    throw new ApiError(404, "Course not found!!")
  }
  return res.status(200).json(new ApiResponse(200, { ppt: course.ppts }, "successfully get course PPT"))
})

const deletePPT = asyncHandler(async (req, res) => {
  const { pptId } = req.params;
  // console.log("pptId", pptId)
  if (!pptId) {
    throw new ApiError(400, "Please provide ppt id")
  }
  const ppt = await PPT.findByIdAndDelete(pptId);
  if (!ppt) {
    throw new ApiError(404, "PPT not found!!")
  }
  // console.log(ppt)
  if (ppt?.fileId) {
    await deleteFileFromGoogleDrive(ppt.fileId);
  }

  await Course.updateOne(
    { ppts: pptId }, // Find Course that contains pptId
    {
      $pull: {
        ppts: pptId  // Remove the PPT id from the ppts array
      },
    })
  return res.status(200)
    .json(new ApiResponse(200, "successfully delete ppt"))
})

const createEbook = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const id = req.params.id;
  if (!title || !id) {
    throw new ApiError(400, "provide E-book name or ID");
  }

  const data = await Course.findById(id);
  if (!data) {
    throw new ApiError(404, "Course not found!!");
  }

  const localFilePath = req.file?.path;
  if (!localFilePath) {
    throw new ApiError(400, "Please provide valid file")
  }

  const uploadfile = await uploadToGoogleDrive(localFilePath, process.env.EBOOK_FOLDERID);
  // console.log(uploadfile)
  if (!uploadfile) {
    throw new ApiError(500, "failed to upload on drive");
  }

  const ebook = await EBook.create({
    title: title,
    fileId: uploadfile?.fileId,
    ebookUrl: uploadfile?.fileUrl
  })

  if (!ebook) {
    throw new ApiError(500, "Failed to create Book")
  }

  await data.Ebooks.push(ebook._id);
  await data.save();
  return res
    .status(200)
    .json(new ApiResponse(201, data, "successfully create E-Book"))
})

// Show Ebook
const getCourseEbook = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  if (!courseId) {
    throw new ApiError(400, "Please provide course id")
  }
  const course = await Course.findById(courseId).populate("Ebooks");
  // console.log(course)
  if (!course) {
    throw new ApiError(404, "Course not found!!")
  }
  return res.status(200).json(new ApiResponse(200, { ebooks: course.Ebooks }, "successfully get course Ebook"))
})


// Delete E-book
const deleteEbook = asyncHandler(async (req, res) => {
  const { ebookId } = req.params;
  // console.log("ebookId", ebookId)
  if (!ebookId) {
    throw new ApiError(400, "Please provide ebook id")
  }
  const ebook = await EBook.findByIdAndDelete(ebookId);
  if (!ebook) {
    throw new ApiError(404, "Ebook not found!!")
  }
  // console.log(ebook)
  if (ebook?.fileId) {
    await deleteFileFromGoogleDrive(ebook.fileId);
  }

  await Course.updateOne(
    { Ebooks: ebookId }, // Find Course that contains EbookId
    {
      $pull: {
        Ebooks: ebookId  // Remove the ebook id from the Ebooks array
      },
    })
  return res.status(200)
    .json(new ApiResponse(200, "successfully delete Ebook"))
})

// Delete Course 
const deleteCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params
  // console.log(courseId)
  if (!courseId) {
    throw new ApiError(400, "Please provide course id")
  }
  const course = await Course.findByIdAndDelete(courseId);
  if (!course) {
    throw new ApiError(404, "Course not found!!")
  }
  if (course?.courseThumbnail) {
    const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
    await deleteMediaFromCloudinary(publicId)
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "successfully delete course"))
})

// Show Publish Course 
const getPublishCourse = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 12;
  const sortBy = req.query.sortBy || "createdAt";
  const order = req.query.order === "asc" ? 1 : -1;
  const skip = (page - 1) * limit;
  const totalCount = await Course.countDocuments({ isPublish: true });
  const courses = await Course.find({ isPublish: true }).sort({ [sortBy]: order }).skip(skip).limit(limit);
  if (courses.length === 0) {
    throw new ApiError(404, "No Publish Course Found")
  }

  return res.status(200).json(new ApiResponse(200, { courses, currentPage: page, Pages: Math.ceil(totalCount / limit) }, "fetch Publish course"))
})

// Publish and unPublish toogle Button
const togglePublish = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { publish } = req.query;// true/false
  if (!courseId) {
    throw new ApiError(400, "Please provide course id")
  }
  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, "Course not found!!")
  }
  course.isPublish = publish === "true";
  await course.save({ validateBeforeSave: true });
  const sendMessage = publish ? "Publish" : "unPublish";
  return res
    .status(200)
    .json(new ApiResponse(200, `Course is ${sendMessage}`));
})

export {
  registerCourse,
  getCourse,
  getSingleCourse,
  updateCourse,
  updateCourseImg,
  deleteCourse,
  getPublishCourse,
  togglePublish,
  addSyllabus,
  deleteSyllabus,
  addPPT,
  getCoursePPT,
  deletePPT,
  createEbook,
  getCourseEbook,
  deleteEbook,
}