import { Router } from "express";
import { getProfile, login, logout, Register, updateProfile } from "../controllers/User.controllers.js";
import verifyJWT from "../middleware/auth.middleware.js";
const router = Router();

router.route('/register').post(Register);
router.post("/login", login)
router.post("/logout", verifyJWT, logout)
router.post("/profile", verifyJWT, getProfile)
router.post("/updateProfile", verifyJWT, updateProfile)
export { router as userRouter };