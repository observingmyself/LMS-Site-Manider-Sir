import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  class: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    require: true,
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
    require: true,
  },
  DOB: {
    type: Date,
  },
  contact: {
    type: String,
    require: true,
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
    require: true,
  }
})

export const register = mongoose.model("register", registerSchema);
