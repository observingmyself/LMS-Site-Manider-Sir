import { Router } from "express"
import { upload } from "../middleware/multer.middleware.js"
import verifyJWT from "../middleware/auth.middleware.js";
import { addSyllabus, getCourse, getSingleCourse, registerCourse } from "../controllers/course.controllers.js";

const router = Router();

router.route("/create").post(verifyJWT, upload.single("courseThumbnail"), registerCourse);
router.route("/").get(getCourse);
router.route("/:id").get(getSingleCourse);
router.route("/addSyllabus/:id").post(upload.single("syllabus"), addSyllabus)

export { router as courseRouter };