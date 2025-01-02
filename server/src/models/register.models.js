import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  classs: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  mode: {
    type: String,
    enum: ["offline", "online"],
    default: "offline"
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"]
  },
  fatherName: {
    type: String,
    trim: true,
    required: true,
  },
  DOB: {
    type: String,
  },
  contact: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    trim: true,
    lowercase: true,
  },
  State: {
    type: String,
    trim: true,
    uppercase: true,
  },
  city: {
    type: String,
    trim: true,
    required: true,
  }
}, { timestamps: true })

export const register = mongoose.model("register", registerSchema);
