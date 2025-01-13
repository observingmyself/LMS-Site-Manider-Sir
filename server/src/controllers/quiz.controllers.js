import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiErrorHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Quiz } from "../models/quiz.models.js";
import { UserAttempt } from "../models/userAttempt.models.js";
import { uploadOnCloudinary, deleteMediaFromCloudinary } from "../utils/cloudinary.js";
import xlsx from "xlsx";
import fs from "fs"

const createQuiz = asyncHandler(async (req, res) => {
  const { title, description, category, difficultyLevel, timeLimit } = req.body;
  const id = req.user?._id;
  if (!id) {
    throw new ApiError(400, "User not found");
  }
  if ([title, description, category, timeLimit].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const quiz = await Quiz.create({
    title,
    description,
    category,
    difficultyLevel,
    timeLimit,
    createdBy: id,
  });

  if (!quiz) {
    throw new ApiError(500, "Quiz not created");
  }
  return res.status(201).json(new ApiResponse(201, quiz, "Quiz created"))
})

const addQuizQuestions = asyncHandler(async (req, res) => {
  const { quizId } = req.params;
  const { question, options, explanation, timeLimit } = req.body;
  if (!quizId) {
    throw new ApiError(400, "Quiz ID is required");
  }
  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    throw new ApiError(404, "Quiz not found");
  }
  const localFilePath = req.file?.path;
  let uploadImg;
  if (localFilePath) {
    uploadImg = await uploadOnCloudinary(localFilePath);
  }

  quiz.questions.push({
    questionText: question,
    questionUrl: uploadImg?.url || "",
    options,
    timeLimit,
    explanation
  })

  await quiz.save({ validateBeforeSave: false });
  return res.status(200).json(new ApiResponse(201, quiz, "Question added"))
})

const addBulkquestionsFromExcelSheet = asyncHandler(async (req, res) => {
  const { quizId } = req.params;
  if (!quizId) {
    throw new ApiError(400, "Quiz ID is required");
  }
  const excelFile = req.file?.path;
  if (!excelFile) {
    throw new ApiError(400, "Excel file is required");
  }
  // Read the Excel file
  try {
    const workbook = xlsx.readFile(excelFile);
    const sheetName = workbook.SheetNames[0]; // Assuming the data is in the first sheet
    const sheet = workbook.Sheets[sheetName];
    const rows = xlsx.utils.sheet_to_json(sheet); // Convert sheet to JSON
    // Map rows to questions
    const questions = rows.map((row) => {
      if (!row["Question Text"] || !row["Option 1"] || !row["Correct Option"]) {
        throw new ApiError(400, "Invalid data format in Excel sheet");
      }
      const options = [
        { optionText: row["Option 1"], isCorrect: row["Correct Option"] === 1 },
        { optionText: row["Option 2"], isCorrect: row["Correct Option"] === 2 },
        { optionText: row["Option 3"], isCorrect: row["Correct Option"] === 3 },
        { optionText: row["Option 4"], isCorrect: row["Correct Option"] === 4 },
        { optionText: row["Option 5"], isCorrect: row["Correct Option"] === 5 },
      ];
      // console.log(row)
      return {
        questionText: row["Question Text"],
        questionUrl: row["Question URL"] || "",
        options: options,
        timeLimit: parseInt(row["Time Limit"]) || 0,
        explanation: row["Explanation"] || "",
      };
    });

    if (!questions) {
      throw new ApiError(400, "No questions found in the Excel file");
    }
    // Find the quiz by ID
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      throw new ApiError(404, "quiz not found")
    }
    // Add the new questions to the quiz
    quiz.questions = quiz.questions.concat(questions);
    console.log(quiz.questions)
    await quiz.save();
    try {
      // Delete the uploaded Excel file after processing
      fs.unlinkSync(excelFile);

    } catch (error) {
      console.log("failed to delete file", error)
    }
    return res.status(200).json(new ApiResponse(200, quiz, "Add file successfully"));
  } catch (error) {
    console.log("failed to delete file in root ", error)
  }
})

const fetchQuizzes = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const sortBy = req.query.sortBy || "createdAt";
  const order = req.query.order || "desc";
  const skip = (page - 1) * limit;
  const quizzes = await Quiz.find()
    .sort({ [sortBy]: order })
    .skip(skip)
    .limit(limit)
    .populate({
      path: "createdBy",
      select: "userName"
    })
    .select("-questions");
  if (!quizzes) {
    throw new ApiError(404, "Quiz not found")
  }
  return res.status(200).json(new ApiResponse(200, quizzes, "fetch All Quiz"))
})

const fetchPublishQuiz = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const sortBy = req.query.sortBy || "createdAt";
  const order = req.query.order || "desc";
  const skip = (page - 1) * limit;
  const quizzes = await Quiz.find({ isPublished: true })
    .sort({ [sortBy]: order })
    .skip(skip)
    .limit(limit)
    .populate({
      path: "createdBy",
      select: "userName"
    })
    .select("-questions");
  if (!quizzes) {
    throw new ApiError(404, "Quiz not found")
  }
  return res.status(200).json(new ApiResponse(200, quizzes, "fetch All Quiz"))
})

const fetchQuiz = asyncHandler(async (req, res) => {
  const quizId = req.params.quizId;
  const quiz = await Quiz.findById(quizId)
    .populate({
      path: "createdBy",
      select: "userName"
    });
  if (!quiz) {
    throw new ApiError(404, "Quiz not found")
  }
  return res.status(200).json(new ApiResponse(200, quiz, "fetch Quiz"))
})

const fetchQuestion = asyncHandler(async (req, res) => {
  const { quizId, questionId } = req.params;
  if (!quizId || !questionId) {
    throw new ApiError(400, "Please provide Id");
  }
  const data = await Quiz.findById(quizId);
  if (!data) {
    throw new ApiError(404, "Quiz not found");
  }
  const question = data.questions.id(questionId);
  if (!question) {
    throw new ApiError(404, "Question not found");
  }
  return res.status(200).json(new ApiResponse(200, question, "fetch specific question"))
})

const editQuestion = asyncHandler(async (req, res) => {
  const { quizId, questionId } = req.params;
  const { question, options, explanation, timeLimit } = req.body;
  if (!(quizId && questionId)) {
    throw new ApiError(400, "Please provide Id");
  }
  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    throw new ApiError(404, "Quiz not found")
  }
  const updatedQuiz = await Quiz.findOneAndUpdate(
    { _id: quizId, "questions._id": questionId },
    {
      $set: {
        "questions.$.questionText": question,
        "questions.$.options": options,
        "questions.$.timeLimit": timeLimit,
        "questions.$.explanation": explanation
      }
    },
    { new: true } // Return the updated quiz document
  );
  if (!updatedQuiz) {
    throw new ApiError(404, "question not found")
  }
  return res.status(200).json(new ApiResponse(200, updatedQuiz, "Question Updated"))
})

const deleteQuestion = asyncHandler(async (req, res) => {
  const { quizId, questionId } = req.params;
  if (!(quizId && questionId)) {
    throw new ApiError(400, "Please provide Id");
  }

  const data = await Quiz.findById(quizId);
  if (!data) {
    throw new ApiError(404, "Quiz not found");
  }

  const url = data.questions.id(questionId);
  if (url.length > 0) {
    const publicId = url.split("/").pop().split(".")[0];
    await deleteMediaFromCloudinary(publicId)
  }

  const deleteQs = await Quiz.findByIdAndUpdate(
    quizId
    , {
      $pull: {
        questions: {
          _id: questionId
        },
      }
    },
    { new: true }
  );
  if (!deleteQs) {
    throw new ApiError(404, "question not found")
  }
  return res.status(200).json(new ApiResponse(200, deleteQs, "Question Deleted"))
})

const togglePublish = asyncHandler(async (req, res) => {
  const { quizId } = req.params;
  const { publish } = req.query;// true/false
  if (!quizId) {
    throw new ApiError(400, "Please provide quiz id")
  }
  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    throw new ApiError(404, "Quiz not found!!")
  }
  quiz.isPublished = publish === "true";
  await quiz.save({ validateBeforeSave: true });
  const sendMessage = publish ? "Publish" : "unPublish";
  return res
    .status(200)
    .json(new ApiResponse(200, `Quiz is ${sendMessage}`));
})

const updateQuestionImg = asyncHandler(async (req, res) => {
  const { quizId, questionId } = req.params;
  const data = await Quiz.findById(quizId);
  if (!data) {
    throw new ApiError(404, "Quiz not found");
  }
  const url = data.questions.id(questionId);
  if (!url) {
    throw new ApiError(404, "no question found")
  }
  if (url?.questionUrl !== "") {
    const publicId = url?.questionUrl.split("/").pop().split(".")[0];
    await deleteMediaFromCloudinary(publicId)
  }
  const localFilePath = req.file?.path;
  if (!localFilePath) {
    throw new ApiError(400, "Please provide Img")
  }
  const result = await uploadOnCloudinary(localFilePath);
  const resultdata = await Quiz.findOneAndUpdate({
    _id: quizId,
    "questions._id": questionId,
  }, {
    $set: {
      "questions.$.questionUrl": result?.url
    }
  }, { new: true })
  if (!resultdata) {
    throw new ApiError(500, "Something not found");
  }
  return res.status(200).json(new ApiResponse(200, "update Img"))
})

const deleteQuestionImg = asyncHandler(async (req, res) => {
  const { quizId, questionId } = req.params;
  const data = await Quiz.findById(quizId);
  if (!data) {
    throw new ApiError(404, "Quiz not found");
  }
  const url = data.questions.id(questionId);
  if (!url) {
    throw new ApiError(404, "no img found")
  }
  if (url?.questionUrl !== "") {
    const publicId = url?.questionUrl.split("/").pop().split(".")[0];
    await deleteMediaFromCloudinary(publicId)
  }
  const resultdata = await Quiz.findOneAndUpdate({
    _id: quizId,
    "questions._id": questionId,
  }, {
    $set: {
      "questions.$.questionUrl": ''
    }
  }, { new: true })
  if (!resultdata) {
    throw new ApiError(500, "Something not found");
  }
  return res.status(200).json(new ApiResponse(200, "Delete Img"))
})


// Controller for User Attempt Operations
const createAttempt = asyncHandler(async (req, res) => {
  try {
    const { quizId, answers, timeTaken } = req.body;
    const userId = req.user?._id; // Assuming req.user contains authenticated user's info
    if (userId) {
      throw new ApiError(401, "unauthorized person")
    }
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      throw new ApiError(404, "Quiz not found!")
    }

    // Calculate score
    let score = 0;
    answers.forEach((answer) => {
      const question = quiz.questions.id(answer.questionId);
      if (question) {
        const selectedOption = question.options.id(answer.selectedOption);
        if (selectedOption && selectedOption.isCorrect) {
          score += 1;
        }
      }
    });

    const attempt = new UserAttempt({
      user: userId,
      quiz: quizId,
      answers,
      score,
      timeTaken,
    });

    const savedAttempt = await attempt.save();
    return res.status(201).json(new ApiResponse(201, { attemps: savedAttempt }, "Attempted questions"));
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to record attempt", error: error.message });
  }
})

const getUserAttempts = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const attempts = await UserAttempt.find({ user: userId }).populate("quiz", "title category")
  return res.status(200).json(new ApiResponse(200, attempts, "fetch user Attempts"))
})

const getSpecificAttempt = asyncHandler(async (req, res) => {
  const { attemptId } = req.params;
  const attempt = await UserAttempt.findById(attemptId).populate("quiz");
  if (!attempt) {
    throw new ApiError(404, "No result found")
  }
  return res.status(200).json(new ApiResponse(200, attempt, "fetch specific attempt"))
})

export {
  createQuiz,
  addQuizQuestions,
  addBulkquestionsFromExcelSheet,
  fetchQuizzes,
  fetchQuiz,
  fetchQuestion,
  editQuestion,
  deleteQuestion,
  togglePublish,
  fetchPublishQuiz,
  updateQuestionImg,
  deleteQuestionImg,
  createAttempt,
  getUserAttempts,
  getSpecificAttempt
}
