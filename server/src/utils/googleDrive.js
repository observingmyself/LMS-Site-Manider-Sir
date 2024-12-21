import { google } from "googleapis";
import path from "path";
import fs from "fs"
import mime from "mime-types"

// Load service account credentials
const KEY_FILE_PATH = "D:/LMS-Site-Manider-Sir/server/googleDrive.json";
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

const auth = new google.auth.GoogleAuth({
  keyFile: KEY_FILE_PATH,
  scopes: SCOPES,
});

// console.log(auth)
const uploadToGoogleDrive = async (localFilePath, folderId) => {
  try {
    if (!localFilePath) {
      console.log("File is not found!", null, localFilePath);
      return null;
    }

    const drive = google.drive({ version: 'v3', auth });
    const fileMetadata = {
      name: path.basename(localFilePath),
      parents: [folderId], // Specify the folder ID where you want to upload the file
    };

    const media = {
      mimeType: mime.lookup(localFilePath) || "application/pdf", // Change this based on your file type
      body: fs.createReadStream(localFilePath),
    };

    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id',
    });
    // console.log(response)
    // Optionally delete the local file after upload
    fs.unlinkSync(localFilePath);
    const fileId = response.data.id;
    const fileUrl = `https://drive.google.com/uc?id=${fileId}`; // Construct the file URL

    return { fileId, fileUrl }; // Return both the file ID and URL
  } catch (error) {
    console.error("Failed to upload to Google Drive:", error);
    fs.unlinkSync(localFilePath); // Clean up local file
    return null;
  }
};

// Delete file from Google Drive
const deleteFileFromGoogleDrive = async (fileId) => {
  try {
    const drive = google.drive({ version: 'v3', auth });
    await drive.files.delete({
      fileId: fileId,
    });
    console.log(`File with ID: ${fileId} deleted successfully.`);
  } catch (error) {
    console.error("Failed to delete file from Google Drive:", error);
    return null;
  }
};

export { uploadToGoogleDrive, deleteFileFromGoogleDrive };