import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
    trim: true,
  },
  questionUrl: {
    type: String,
  },
  options: [
    {
      optionText: {
        type: String,
      },
      isCorrect: {
        type: Boolean,
        default: false,
      },
    },
  ],
  timeLimit: {
    type: Number,
    default: 0
  },
  explanation: {
    type: String, // Optional: explanation for the correct answer
  },
})

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String, // e.g., "Math", "Science", "History"
    required: true,
  },
  difficultyLevel: {
    type: String, // e.g., "Easy", "Medium", "Hard"
    enum: ["Easy", "Medium", "Hard"],
    default: "Easy",
  },
  questions: [QuestionSchema], // Embedding questions schema
  timeLimit: {
    type: Number, // In minutes (0 for no time limit)
    default: 0,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the user/admin who created the quiz
    required: true,
  },
  isPublished: {
    type: Boolean,
    default: false, // Controls whether the quiz is available for users
  },
}, { timestamps: true })

export const Quiz = mongoose.model("Quiz", quizSchema);