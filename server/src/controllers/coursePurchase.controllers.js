import { CoursePurchase } from "../models/coursePurchase.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiErrorHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Course } from "../models/course.models.js";
import { User } from "../models/user.models.js";
import { createRazorpayInstance } from "../config/razorpay.config.js";
import crypto from "crypto";


const razorpayInstance = createRazorpayInstance();
// console.log(razorpayInstance)
const createCheckoutSession = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { courseId } = req.body;
  if (!userId) {
    throw new ApiError(401, "User unauthorized");
  }
  if (!courseId) {
    throw new ApiError(400, "Course id is required");
  }

  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }
  const newPurchase = new CoursePurchase({
    userId,
    courseId,
    amount: course.coursePrice,
  })

  const options = {
    amount: course.coursePrice * 100,
    currency: "INR",
    receipt: `order_${Date.now()}`,
  }
  // console.log(newPurchase, options)

  try {
    const response = await new Promise((resolve, reject) => {
      razorpayInstance.orders.create(options, (err, order) => {
        if (err) {
          console.log(err)
          return reject(new ApiError(500, "Failed to create checkout session"))
        }
        resolve(order);
      });
    });
    // console.log(response)
    newPurchase.paymentId = response.id;
    await newPurchase.save({ validateBeforeSave: false });
    if (!newPurchase) {
      throw new ApiError(500, "Failed to create purchase")
    }
    return res.status(200).json(new ApiResponse(200, response, "create checkout session"));
  } catch (error) {
    console.log(error)
    throw new ApiError(500, "Something went wrong checkout session")
  }
});

const verifyPayment = asyncHandler(async (req, res) => {
  const { order_id, payment_id, signature } = req.body;
  // console.log(req.body)
  const secret = process.env.ROZARPAY_API_SECRET_KEY;

  // Create a string to verify the signature
  const generatedSignature = crypto
    .createHmac('sha256', secret) // Use your Razorpay key secret
    .update(`${order_id}|${payment_id}`)
    .digest('hex');

  // Verify Payment
  if (generatedSignature !== signature) {
    throw new ApiError(400, "Payment not verified")
  }

  try {
    // Database Operation
    const newPurchase = await CoursePurchase.findOne({ paymentId: order_id }).populate({ path: "courseId" });
    if (!newPurchase) {
      throw new ApiError(404, "Purchase not found");
    }
    // Update purchase status
    newPurchase.paymentStatus = "Completed";
    newPurchase.paymentId = payment_id,
      await newPurchase.save({ validateBeforeSave: false });

    // update EnrolledCourse 
    await User.findByIdAndUpdate(newPurchase?.userId, {
      $addToSet: {
        enrolledCourse: newPurchase.courseId._id, // Add Course Id to Enrolled Courses
      }
    }, {
      new: true,
    })

    // update Enrolled Student User in Course 
    await Course.findByIdAndUpdate(newPurchase?.courseId, {
      $addToSet: {
        enrolledStudent: newPurchase.userId._id // Add user Id to Enrolled student
      }
    }, {
      new: true,
    })
  } catch (error) {
    console.log("Error Handling Event", error)
    throw new ApiError(500, "internal server error")
  }

  return res.status(200)
    .json(new ApiResponse(200, "verified Payment"))
})

const getCourseDetailWithStatusSuccess = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  // console.log(courseId)
  const user = req.user?._id;
  if (!courseId || !user) {
    throw new ApiError(400, "Invalid Request")
  }
  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }
  const purchased = await CoursePurchase.findOne({ userId: user, courseId: courseId, paymentStatus: "Completed" })
  return res
    .status(200)
    .json(new ApiResponse(200, {
      course,
      purchased: !!purchased,
    }, "purchased data fetch"))
})

const getAllPurchaseCourse = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 20;
  const skip = (page - 1) * limit;
  const sortBy = req.query.sortBy || "createdAt";
  const order = req.query.order === "asc" ? 1 : -1;
  const data = await CoursePurchase.find({ paymentStatus: "Completed" }).sort({ [sortBy]: order }).skip(skip).limit(limit).populate("courseId")
  if (data.length === 0) {
    throw new ApiError(404, "No Purchase course found")
  }
  const totalCount = await CoursePurchase.countDocuments({ paymentStatus: "Completed" });
  return res.status(200).json(new ApiResponse(200, { data, pages: Math.ceil(totalCount / limit), currentPage: page }, "purchased data fetch"))
})

export {
  createCheckoutSession,
  verifyPayment,
  getCourseDetailWithStatusSuccess,
  getAllPurchaseCourse,
}