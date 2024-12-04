import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
  newsHeadline: {
    type: String,
    trim: true
  },
  newsDescription: {
    type: String,
    trim: true
  },
  newsImage: {
    type: String,
    default: "",
  }
}, { timestamps: true })

const News = mongoose.model("News", NewsSchema);
export default News;