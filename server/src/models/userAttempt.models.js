import mongoose from "mongoose";

const userAttemptSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    score: {
      type: Number,
      default: 0, // Calculated based on correct answers
    },
    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Quiz.questions",
          required: true,
        },
        selectedOption: {
          type: mongoose.Schema.Types.ObjectId, // Reference to options in the QuestionSchema
        },
        isCorrect: {
          type: Boolean,
          required: true,
        },
      },
    ],
    timeTaken: {
      type: Number, // In seconds
      default: 0,
    },
    attemptDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

export const UserAttempt = mongoose.model("UserAttempt", userAttemptSchema);
