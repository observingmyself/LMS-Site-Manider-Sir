import { Router } from "express";
import { changePassword, getProfile, login, logout, Register, updateProfile, updateProfileImg } from "../controllers/User.controllers.js";
import verifyJWT from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
const router = Router();

router.route('/register').post(upload.fields([
  {
    name: "profileImg",
    maxCount: 1
  }
]), Register);
router.post("/login", login)
router.post("/logout", verifyJWT, logout)
router.post("/profile", verifyJWT, getProfile)
router.post("/updateProfile", verifyJWT, updateProfile)
router.post("/updateImg", verifyJWT, upload.single("profileImg"), updateProfileImg)
router.post("/updatePassword", verifyJWT, changePassword)
export { router as userRouter };