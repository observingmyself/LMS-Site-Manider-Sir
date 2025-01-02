import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiErrorHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { register } from "../models/register.models.js";

const registerForm = asyncHandler(async (req, res) => {
  const data = req.body;
  if (!data) {
    throw new ApiError(400, "Data not recieved")
  }
  const existingRequest = await register.findOne({ contact: data.contact })
  if (existingRequest) {
    throw new ApiError(409, "Already Submited Form")
  }
  const create = new register(data);
  const response = await create.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(201, response, "Form Submitted"))
})

const getRegisterData = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const sortBy = req.query.sortBy || "createdAt";
  const order = req.query.order === "asc" ? 1 : -1;
  const skip = (page - 1) * limit;
  const totalCount = await register.countDocuments();
  
  const data = await register.find().sort({ [sortBy]: order }).skip(skip).limit(limit);
  return res
    .status(200)
    .json(new ApiResponse(200, { data, currentPage: page, Pages: Math.ceil(totalCount / limit) }, "Data Fetched"))
})

const deleteRegisterData = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new ApiError(400, "id not recieved");
  }
  const data = await register.findByIdAndDelete(id);
  if (!data) {
    throw new ApiError(404, "Data not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Successfully data deleted"))
})

export {
  registerForm,
  getRegisterData,
  deleteRegisterData,
}