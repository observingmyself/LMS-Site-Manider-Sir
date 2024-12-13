import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import dotenv from "dotenv"
import { raw } from 'express';
dotenv.config({});

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
})

const uploadOnCloudinary = async function (localFilePath) {
  try {
    if (!localFilePath) {
      return console.log("File is not Found!", null, localFilePath);
    }

    // Upload an image
    const response = await cloudinary.uploader.upload(
      localFilePath,
      {
        resource_type: 'auto',
      })
    fs.unlinkSync(localFilePath);
    return response
  } catch (error) {
    console.log("Failed to upload on Cloudinary")
    fs.unlinkSync(localFilePath)
    return null
  }
}

const deleteMediaFromCloudinary = async function (publicId) {
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.log("Failed to delete on Cloudinary")
    return
  }
}
const deleteFileFromCloudinary = async function (publicId) {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: raw })
  } catch (error) {
    console.log("Failed to delete on Cloudinary")
    return error
  }
}

export { uploadOnCloudinary, deleteMediaFromCloudinary, deleteFileFromCloudinary };