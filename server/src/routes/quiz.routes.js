import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import { addBulkquestionsFromExcelSheet, addQuizQuestions, createQuiz, deleteQuestion, editQuestion, fetchPublishQuiz, fetchQuiz, fetchQuizzes, togglePublish } from "../controllers/quiz.controllers.js";
import { upload } from "../middleware/multer.middleware.js";
const router = Router();

router.route("/create").post(verifyJWT, createQuiz)
router.route("/question/:quizId").post(verifyJWT, upload.single("questionUrl"), addQuizQuestions)
router.route("/bulk-question-excel/:quizId").post(verifyJWT, upload.single("questions"), addBulkquestionsFromExcelSheet)
router.route("/").get(fetchPublishQuiz)
router.route("/quizzes").get(fetchQuizzes)
router.route("/quizz/:quizId").get(fetchQuiz)
router.route("/:quizId/edit/:questionId").patch(verifyJWT, editQuestion)
router.route("/publish-quiz/:quizId").patch(verifyJWT, togglePublish)
router.route("/:quizId/remove-question/:questionId").delete(verifyJWT, deleteQuestion)
export { router as quizRouter };