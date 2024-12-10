import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: true,
  },
  message: {
    type: String,
    require: true
  },
  reviewImage: {
    type: String,
  }
}, { timestamps: true })

export const Review = mongoose.model("Review", reviewSchema);