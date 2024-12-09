import { Router } from "express"
import verifyJWT from "../middleware/auth.middleware.js"
import { upload } from "../middleware/multer.middleware.js"
import { getLatestNews } from "../controllers/news.controllers.js";

const router = Router();

router.get("/", getLatestNews)