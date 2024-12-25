import { Router } from "express";
import { createCheckoutSession, getAllPurchaseCourse, getCourseDetailWithStatusSuccess, verifyPayment } from "../controllers/coursePurchase.controllers.js";
import verifyJWT from "../middleware/auth.middleware.js";

const router = Router();

router.route("/checkout").post(verifyJWT, createCheckoutSession);
router.route("/verifyPayment").post(verifyJWT, verifyPayment);
router.route("/course/:courseId/detail-status").get(verifyJWT, getCourseDetailWithStatusSuccess);
router.route("/").get(verifyJWT, getAllPurchaseCourse);
export { router as paymentRouter };