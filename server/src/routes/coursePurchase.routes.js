import { Router } from "express";
import { createCheckoutSession, verifyPayment } from "../controllers/coursePurchase.controllers.js";
import verifyJWT from "../middleware/auth.middleware.js";

const router = Router();

router.route("/checkout").post(verifyJWT, createCheckoutSession);
router.route("/verifyPayment").post(verifyJWT, verifyPayment)

export { router as paymentRouter };