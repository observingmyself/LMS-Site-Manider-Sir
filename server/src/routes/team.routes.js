import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { createTeamMemeber, deleteTeamMember, getSingleMember, getTeamMember, updateImg, updateTeamMember } from "../controllers/team.controllers.js";
const router = Router();

router.route("/create").post(verifyJWT, upload.single("image"), createTeamMemeber);
router.route("/").get(getTeamMember);
router.route("/singleMember/:id").get(verifyJWT, getSingleMember)
router.route("/update/:id").patch(verifyJWT, updateTeamMember);
router.route("/updateImage/:id").patch(verifyJWT, upload.single("image"), updateImg);
router.route("/delete/:id").delete(verifyJWT, deleteTeamMember);

export { router as teamRouter };