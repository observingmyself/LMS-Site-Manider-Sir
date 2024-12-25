import mongoose from "mongoose"

const coursePurchaseSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  paymentId: {
    type: String,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "Completed", "Failed"],
    default: "pending",
  },
  amount: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

export const CoursePurchase = mongoose.model("CoursePurchase", coursePurchaseSchema);
