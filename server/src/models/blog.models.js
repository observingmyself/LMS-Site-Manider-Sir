import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  BlogUrl: {
    type: String,
  },
  BlogTitle: {
    type: String,
    trim: true
  },
  Instructor: {
    type: String,
    trim: true
  },
  Description: {
    type: String,
    trim: true
  },
  BlogType: {
    type: String,
  }
}, { timestamps: true })

export const Blog = mongoose.model("Blog", blogSchema);
