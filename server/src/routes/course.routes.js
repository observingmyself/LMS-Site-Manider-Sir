import { Router } from "express"
import { upload } from "../middleware/multer.middleware.js"
import verifyJWT from "../middleware/auth.middleware.js";
import { addPPT, addSyllabus, createEbook, deleteCourse, deleteEbook, deletePPT, deleteSyllabus, getCourse, getCourseEbook, getCoursePPT, getSingleCourse, registerCourse, } from "../controllers/course.controllers.js";

const router = Router();

router.route("/create").post(verifyJWT, upload.single("courseThumbnail"), registerCourse);
router.route("/").get(getCourse);
router.route("/:id").get(getSingleCourse);
router.route("/ppt/:courseId").get(getCoursePPT);
router.route("/Ebook/:courseId").get(getCourseEbook);
router.route("/addSyllabus/:id").post(verifyJWT, upload.single("syllabus"), addSyllabus);
router.route("/addppt/:id").post(verifyJWT, upload.single("pptUrl"), addPPT);
router.route("/addEbook/:id").post(verifyJWT, upload.single("ebookUrl"), createEbook);
router.route("/:id/:syllabusId").delete(verifyJWT, deleteSyllabus);
router.route("/removePPT/:pptId").delete(verifyJWT, deletePPT)
router.route("/removeEbook/:ebookId").delete(verifyJWT, deleteEbook);
router.route("/removeCourse/:courseId").delete(verifyJWT, deleteEbook);


export { router as courseRouter };