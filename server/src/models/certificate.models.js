import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
  },
  DOB: {
    type: String,
  },
  course: {
    type: String,
    uppercase: true,
    trim: true,
  },
  certificateImg: {
    type: String,
  },
  fileId: {
    type: String,
  }
}, { timestamps: true });

export const Certificate = mongoose.model("Certificate", certificateSchema);