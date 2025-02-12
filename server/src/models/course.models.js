import mongoose from "mongoose"

const syllabusSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    trim: true,
  },
  fileName: {
    type: String,
    trim: true,
  },
  fileId: {
    type: String,
    required: true,
  }
})

const courseSchema = new mongoose.Schema({
  courseTitle: {
    type: String,
    required: true,
    trim: true
  },
  subTitle: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  courseLevel: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advance"],
    default: "Beginner"
  },
  coursePrice: {
    type: Number,
    required: true,
  },
  courseThumbnail: {
    type: String,
    required: true,
  },

  syllabus: [syllabusSchema],

  courseDuration: {
    type: String,
  },
  courseLanguage: {
    type: String,
    default: "Hindi"
  },
  instructor: {
    type: String
  },
  enrolledStudent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  Ebooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EBook"
    }
  ],
  ppts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PPT"
    }
  ],
  isPublish: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

const Course = mongoose.model("Course", courseSchema)
export { Course };