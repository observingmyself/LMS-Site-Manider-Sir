import { Router } from "express"
import { upload } from "../middleware/multer.middleware.js"
import verifyJWT from "../middleware/auth.middleware.js";
import { addPPT, addSyllabus, createEbook, deleteCourse, deleteEbook, deletePPT, deleteSyllabus, getCourse, getCourseEbook, getCoursePPT, getPublishCourse, getSingleCourse, registerCourse, togglePublish, updateCourse, updateCourseImg, } from "../controllers/course.controllers.js";

const router = Router();

// Course
router.route("/").get(getPublishCourse)
router.route("/singlecourse/:id").get(getSingleCourse);
router.route("/courses").get(verifyJWT, getCourse);
router.route("/create").post(verifyJWT, upload.single("courseThumbnail"), registerCourse);
router.route("/edit/:courseId").patch(verifyJWT, updateCourse)
router.route("/editImg/:courseId").patch(verifyJWT, upload.single("courseThumbnail"), updateCourseImg)
router.route("/togglePublish/:courseId").patch(verifyJWT, togglePublish)
router.route("/removeCourse/:courseId").delete(deleteCourse);

// PPT
router.route("/addppt/:id").post(verifyJWT, upload.single("pptUrl"), addPPT);
router.route("/ppt/:courseId").get(getCoursePPT);
router.route("/removePPT/:pptId").delete(verifyJWT, deletePPT)


// Syllabus
router.route("/addSyllabus/:id").post(verifyJWT, upload.single("syllabus"), addSyllabus);
router.route("/removeSyllabus/:id/:syllabusId").delete(verifyJWT, deleteSyllabus);

// E-Book
router.route("/addEbook/:id").post(verifyJWT, upload.single("ebookUrl"), createEbook);
router.route("/Ebook/:courseId").get(getCourseEbook);
router.route("/removeEbook/:ebookId").delete(verifyJWT, deleteEbook);



export { router as courseRouter };