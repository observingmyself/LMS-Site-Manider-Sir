import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import { addBulkquestionsFromExcelSheet, addQuizQuestions, createAttempt, createQuiz, deleteQuestion, deleteQuestionImg, editQuestion, fetchPublishQuiz, fetchQuiz, fetchQuizzes, getUserAttempts, togglePublish, updateQuestionImg } from "../controllers/quiz.controllers.js";
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
router.route("/:quizId/update-question-Img/:questionId").patch(verifyJWT, upload.single("questions"), updateQuestionImg)
router.route("/:quizId/remove-question-Img/:questionId").delete(verifyJWT, deleteQuestionImg)
router.route("/:quizId/remove-question/:questionId").delete(verifyJWT, deleteQuestion)

// Attempt routes
router.route("/attempt").post(verifyJWT, createAttempt);
router.route("/getAttempt").get(verifyJWT, getUserAttempts);
router.route("/getAttempt/:attemptId").get(verifyJWT, getUserAttempts);


export { router as quizRouter };