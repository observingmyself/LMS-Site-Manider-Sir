import mongoose from "mongoose"

// EBOOK Schema
const ebookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  fileId: {
    type: String,
  },
  ebookUrl: {
    type: String,
    required: true
  },
}, { timestamps: true })

export const EBook = mongoose.model("EBook", ebookSchema);


// PPT Schema
const pptSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  fileId: {
    type: String,
  },
  pptUrl: {
    type: String,
    required: true
  },
}, { timestamps: true })

export const PPT = mongoose.model("PPT", pptSchema);