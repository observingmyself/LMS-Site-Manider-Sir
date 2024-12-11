import { Router } from "express"
import { upload } from "../middleware/multer.middleware.js"
import verifyJWT from "../middleware/auth.middleware.js";
import { registerCourse } from "../controllers/course.controllers.js";

const router = Router();

router.route("/create").post(verifyJWT, upload.single("courseThumbnail"), registerCourse);


export { router as courseRouter };