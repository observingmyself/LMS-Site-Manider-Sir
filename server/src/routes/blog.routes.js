import { Router } from "express";
import { createBlog, deleteBlog, getBlog, getSingleBlog, updateBlog, updateBlogImg } from "../controllers/blog.controllers.js";
import verifyJWT from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
const router = Router();

router.route("/").get(getBlog);
router.route("/:id").get(getSingleBlog);
router.route("/create").post(verifyJWT, upload.fields([
  {
    name: "BlogUrl",
    maxCount: 3,
  }
]), createBlog);
router.route("/update/:id").patch(verifyJWT, updateBlog);
router.route("/updateImg/:id").patch(verifyJWT, upload.single("BlogUrl"), updateBlogImg);
router.route("/:id").delete(verifyJWT, deleteBlog);

export { router as blogRouter };
