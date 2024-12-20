import { asyncHandler } from "../utils/asyncHandler.js";
import { Team } from "../models/team.models.js";
import { ApiError } from "../utils/apiErrorHandler.js";
import { uploadOnCloudinary, deleteMediaFromCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

const createTeamMemeber = asyncHandler(async (req, res) => {
  const { name, position } = req.body;
  if (!(name || position)) {
    throw new ApiError(400, "Please provide name and position");
  }
  const playerImg = req.file?.path;
  if (!playerImg) {
    throw new ApiError(400, "Please provide image")
  }
  const uploadImg = await uploadOnCloudinary(playerImg)
  if (!uploadImg) {
    throw new ApiError(400, "Failed to upload image")
  }
  const team = await Team.create({
    name,
    position,
    image: uploadImg?.url
  })
  return res
    .status(200)
    .json(new ApiResponse(201, team, "Successfully create Team Member"))
})

const getTeamMember = asyncHandler(async (req, res) => {
  const team = await Team.find()
  if (!team) {
    throw new ApiError(404, "No team Member found")
  }
  return res
    .status(200)
    .json(new ApiResponse(200, team, "List of Team Member"))
})

const updateTeamMember = asyncHandler(async (req, res) => {
  const { name, position } = req.body;
  const id = req.params.id;
  if (!id) {
    throw new ApiError(400, "Please provide id")
  }
  if (!(name || position)) {
    throw new ApiError(400, "Please provide name and position");
  }
  const update = await Team.findByIdAndUpdate(
    id,
    {
      $set: {
        name,
        position
      }
    }, { new: true })
  if (!update) {
    throw new ApiError(404, "No team Member found")
  }
  await update.save();
  return res
    .status(200)
    .json(new ApiResponse(200, update, "Successfully update Team Member"))
})

const updateImg = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new ApiError(400, "Please provide id")
  }
  const data = await Team.findById(id);
  if (!data) {
    throw new ApiError(404, "No team Member found")
  }
  if (data?.image) {
    const publicId = data.image.split("/").pop().split(".")[0];
    await deleteMediaFromCloudinary(publicId)
  }
  const newImgpath = req.file?.path;
  if (!newImgpath) {
    throw new ApiError(400, "Please provide valid file");
  }
  const upload = await uploadOnCloudinary(newImgpath);
  if (!upload) {
    throw new ApiError(500, "failed to upload");
  }
  const update = await Team.findByIdAndUpdate(id, { $set: { image: upload?.url } }, {
    new: true,
  })
  if (!update) {
    throw new ApiError(404, "No team Member found")
  }
  return res
    .status(200)
    .json(new ApiResponse(200, update, "update image successfully"))
})

const deleteTeamMember = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new ApiError(400, "Please provide id")
  }
  const data = await Team.findById(id);
  if (!data) {
    throw new ApiError(404, "No team Member found")
  }
  if (data?.image) {
    const publicId = data.image.split("/").pop().split(".")[0];
    await deleteMediaFromCloudinary(publicId)
  }
  const member = await Team.findByIdAndDelete(id);
  if (!member) {
    throw new ApiError(404, "No team Member found")
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Team Member deleted successfully"))
})

export {
  getTeamMember,
  updateTeamMember,
  createTeamMemeber,
  updateImg,
  deleteTeamMember,
}