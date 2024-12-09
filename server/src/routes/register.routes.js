import { Router } from "express";
import { getRegisterData, registerForm } from "../controllers/register.controllers.js";
const router = Router();

router.route("/").post(registerForm);
router.route("/getData").post(getRegisterData)

export { router as registerRouter };