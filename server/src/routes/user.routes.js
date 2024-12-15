import { Router } from "express";
import { changePassword, forgetPassword, getProfile, login, logout, refreshAndAccessToken, Register, resetPassword, updateProfile, updateProfileImg } from "../controllers/user.controllers.js";
import verifyJWT from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "profileImg",
      maxCount: 1,
    },
  ]),
  Register
);
router.post("/login", login);
router.post("/logout", verifyJWT, logout);
router.get("/google", googleLogin);

router.post("/genrateToken", refreshAndAccessToken);
router.post("/forget-password", forgetPassword);
router.post("/reset-password/:token", resetPassword)
router.get("/profile", verifyJWT, getProfile)
router.patch("/updateProfile", verifyJWT, updateProfile)
router.patch("/updateImg", verifyJWT, upload.single("profileImg"), updateProfileImg)
router.patch("/updatePassword", verifyJWT, changePassword)
export { router as userRouter };
