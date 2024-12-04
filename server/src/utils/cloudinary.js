import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
const uploadOnCloudinary = async function (localFilePath) {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
  })

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

export { uploadOnCloudinary };