import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import JWT from 'jsonwebtoken'

const userSchema = new mongoose.Schema({

  userName: {
    type: String,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  mobileNo: {
    type: String,
    trim: true,
    require: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student",
  },
  enrolledCourse: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    }
  ],
  profileImg: {
    type: String,
    default: "",
  },
  refreshToken: {
    type: String,
  }
}, { timestamps: true })

userSchema.pre('save', async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 8)
  next();
})

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
  return JWT.sign({
    _id: this._id,
    email: this.email
  },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  )
}

userSchema.methods.generateRefreshToken = function () {
  return JWT.sign({
    _id: this._id,
  },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  )
}

export const User = mongoose.model('User', userSchema);
