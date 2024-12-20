import { Router } from "express"
import { upload } from "../middleware/multer.middleware.js"
import verifyJWT from "../middleware/auth.middleware.js";
import { addSyllabus, deleteSyllabus, getCourse, getSingleCourse, registerCourse } from "../controllers/course.controllers.js";

const router = Router();

router.route("/create").post(verifyJWT, upload.single("courseThumbnail"), registerCourse);
router.route("/").get(getCourse);
router.route("/:id").get(getSingleCourse);
router.route("/addSyllabus/:id").post(verifyJWT, upload.single("syllabus"), addSyllabus)
router.route("/:id/:syllabusId").delete(verifyJWT, deleteSyllabus)

export { router as courseRouter };