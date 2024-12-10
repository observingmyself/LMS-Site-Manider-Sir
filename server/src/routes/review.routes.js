import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import { createReview, deleteReview, getReview } from "../controllers/reviews.controllers.js";
const router = Router();

router.route("/create").post(verifyJWT, createReview);
router.route("/").get(getReview);
router.route("/:id").delete(deleteReview);

export { router as reviewRouter }