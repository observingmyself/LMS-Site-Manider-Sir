import { Contact } from "../models/contact.models.js";
import { ApiError } from "../utils/apiErrorHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createContact = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;
  if ([name, email, subject, message].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required")
  }
  const contact = await Contact.create({
    name,
    email,
    subject, message
  })
  if (!contact) {
    throw new ApiError(500, "Failed to create contact")
  }
  return res
    .status(200)
    .json(new ApiResponse(201, contact, "contact form created"));
})

const getsingleForm = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new ApiError(400, "id is required")
  }
  const contact = await Contact.findById(id);
  if (!contact) {
    throw new ApiError(404, "Contact Form not found, Invalid id")
  }
  return res
    .status(200)
    .json(new ApiResponse(200, contact, "fetch form successfully"))
})

const getForm = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const sortBy = req.query.sortBy || "createdAt";
  const order = req.query.order === "asc" ? 1 : -1;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find().sort({ [sortBy]: order }).skip(skip).limit(limit)
  if (!contacts) {
    throw new ApiError(404, "No contacts found")
  }
  const totalCount = await Contact.countDocuments;
  return res
    .status(200)
    .json(new ApiResponse(200, {
      contacts,
      currentPage: page,
      Pages: Math.ceil(totalCount / limit)
    }, "fetch form successfully"))
})

const deleteForm = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new ApiError(400, "id is required")
  }
  const contact = await Contact.findByIdAndDelete(id);
  if (!contact) {
    throw new ApiError(404, "Contact Form not found, Invalid id")
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "successfully deleted form"))
})

export {
  createContact,
  getsingleForm,
  getForm,
  deleteForm
}