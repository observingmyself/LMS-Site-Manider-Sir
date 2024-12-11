import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  message: {
    type: String,
    required: true
  },
  reviewImage: {
    type: String,
  }
}, { timestamps: true })

export const Review = mongoose.model("Review", reviewSchema);