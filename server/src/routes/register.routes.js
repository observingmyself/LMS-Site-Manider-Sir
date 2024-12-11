import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import { deleteRegisterData, getRegisterData, registerForm } from "../controllers/register.controllers.js";
const router = Router();

router.route("/").post(registerForm);
router.route("/getData").post(verifyJWT, getRegisterData)
router.route("/:id").delete(verifyJWT, deleteRegisterData)

export { router as registerRouter };