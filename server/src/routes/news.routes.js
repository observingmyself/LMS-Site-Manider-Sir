import { Router } from "express"
import verifyJWT from "../middleware/auth.middleware.js"
import { upload } from "../middleware/multer.middleware.js";
import { CreateNews, deleteNews, getLatestNews, getSingleNews, updatenewImage, updateNews } from "../controllers/news.controllers.js";

const router = Router();

router.route('/').get(getLatestNews);
router.route("/:id").get(getSingleNews);
router.route("/createNews").post(verifyJWT, upload.fields([
  {
    name: "newsImage",
    maxCount: 1
  }
]), CreateNews);
router.route("/update/:id").patch(verifyJWT, updateNews);
router.route("/updateImage/:id").patch(verifyJWT, upload.single("newsImage"), updatenewImage);
router.route("/delete/:id").delete(verifyJWT, deleteNews)

export { router as newsRouter };