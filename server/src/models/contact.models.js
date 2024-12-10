import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    trim: true
  },
  message: {
    type: String,
  }
}, { timestamps: true });

const Contact = mongoose.model("Contact", contactSchema);
export { Contact };