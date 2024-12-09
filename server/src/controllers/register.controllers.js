import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiErrorHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { register } from "../models/register.model.js";

const registerForm = asyncHandler(async (req, res) => {
  const data = req.body;
  if (!data) {
    throw new ApiError(400, "Data not recieved")
  }
  const create = new register(data);
  const response = await create.save();
  return res
    .status(200)
    .json(new ApiResponse(201, response, "Form Submitted"))
})

const getRegisterData = asyncHandler(async (req, res) => {
  const data = await register.find();
  return res
    .status(200)
    .json(new ApiResponse(200, data, "Data Fetched"))
})

export {
  registerForm,
  getRegisterData,
}