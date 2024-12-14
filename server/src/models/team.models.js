import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  position: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
}, { timestamps: true })

export const Team = mongoose.model("Team", teamSchema);