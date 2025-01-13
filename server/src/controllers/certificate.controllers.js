import { Certificate } from "../models/certificate.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiErrorHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { deleteFileFromGoogleDrive, uploadToGoogleDrive } from "../utils/googleDrive.js";
import { pagespeedonline } from "googleapis/build/src/apis/pagespeedonline/index.js";
import { advisorynotifications_v1 } from "googleapis";

const createCertificate = asyncHandler(async (req, res) => {
  const { name, DOB, course } = req.body;
  if (!(name || DOB)) {
    throw new ApiError(400, "Please fill fields");
  }

  const localPath = req.file?.path;
  if (!localPath) {
    throw new ApiError(400, "Please upload a certificate file");
  }

  const data = await uploadToGoogleDrive(localPath, process.env.CERTIFICATE_FOLDERID);
  if (!data) {
    throw new ApiError(500, "Failed to upload to Google Drive");
  }
  const certificate = await Certificate.create({ name, DOB, course, certificateImg: data.fileUrl, fileId: data.fileId })
  if (!certificate) {
    throw new ApiError(500, "Something went wrong while to create a certificate");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, certificate, "certificate created"))
})

const getCertificate = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 12;
  const sortBy = req.query.sortBy || "createdAt";
  const order = req.query.order === "asc" ? 1 : -1;
  const skip = (page - 1) * limit;
  const totalCount = await Certificate.countDocuments();
  const data = await Certificate.find().sort({ [sortBy]: order }).skip(skip).limit(limit);
  if (!data) {
    throw new ApiError(404, "No courses found")
  }
  // const totalCount = await Certificate.countDocuments();
  return res.status(200)
    .json(new ApiResponse(200, { data, currentPage: page, Pages: Math.ceil(totalCount / limit) }, "successfully fetch data"));
})

const editCertificate = asyncHandler(async (req, res) => {
  const { name, DOB, course } = req.body;
  const id = req.params.id;
  if (!id) {
    throw new ApiError(400, "Please provide Id")
  }
  if (!(name || DOB)) {
    throw new ApiError(400, "Please fill fields");
  }

  const data = await Certificate.findById(id);
  if (!data) {
    throw new ApiError(404, "certificate not found!!")
  }

  const update = await Certificate.findByIdAndUpdate(id, {
    $set: {
      name,
      DOB,
      course,
    }
  }, {
    new: true
  })
  if (!update) {
    throw new ApiError(400, "failed to update certificate")
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "certificate update Successfully"))
})

const editCertificateImg = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new ApiError(401, "Please provide Id")
  }
  const data = await Certificate.findById(id);
  if (!data) {
    throw new ApiError(404, "certificate not found!!")
  }

  const localPath = req.file?.path;
  if (!localPath) {
    throw new ApiError(400, "Please upload image")
  }
  await deleteFileFromGoogleDrive(data.fileId);
  const upload = await uploadToGoogleDrive(localPath, process.env.CERTIFICATE_FOLDERID);
  if (!upload) {
    throw new ApiError(400, "Failed to upload image to google drive")
  }

  const update = await Certificate.findByIdAndUpdate(id, {
    $set: {
      certificateImg: upload?.fileUrl,
      fileId: upload?.fileId
    }
  }, {
    new: true
  })
  if (!update) {
    throw new ApiError(500, "failed to update certificate Image")
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "updated certificate Image successfully"))
})

const deleteCertificate = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new ApiError(400, "Please provide Id")
  }
  const data = await Certificate.findById(id);
  if (!data) {
    throw new ApiError(404, "certificate not found!!")
  }
  await deleteFileFromGoogleDrive(data.fileId);
  const deleteCertificate = await Certificate.findByIdAndDelete(id);
  if (!deleteCertificate) {
    throw new ApiError(500, "Failed to delete certificate")
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "certificate deleted successfully"))
})

const getSingleCertificate = asyncHandler(async (req, res) => {
  const { name, DOB } = req.body;
  if (!name) {
    throw new ApiError(400, "Please provide name")
  }

  const data = await Certificate.findOne({ name: name, DOB: DOB })
  if (!data) {
    throw new ApiError(404, "data not found!!")
  }
  return res.status(200).json(new ApiResponse(200, data, "Successfully fetch data"))
})

const getCertificateById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new ApiError(400, "Please provide Id")
  }
  const data = await Certificate.findById(id);
  if (!data) {
    throw new ApiError(404, "Certificate not found!!")
  }
  return res.status(200).json(new ApiResponse(200, data, "Successfully fetch data"))
})

export {
  createCertificate,
  getCertificate,
  editCertificate,
  editCertificateImg,
  deleteCertificate,
  getSingleCertificate,
  getCertificateById
}