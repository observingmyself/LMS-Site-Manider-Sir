import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { createCertificate, deleteCertificate, editCertificate, editCertificateImg, getCertificate, getSingleCertificate } from "../controllers/certificate.controllers.js";
const router = Router();

router.route("/create").post(verifyJWT, upload.single("certificateImg"), createCertificate);

router.route("/").get(verifyJWT, getCertificate);
router.route("/update/:id").patch(verifyJWT, editCertificate);
router.route("/updateImg/:id").patch(verifyJWT, upload.single("certificateImg"), editCertificateImg);
router.route("/check").get(getSingleCertificate)
router.route("/:id").delete(verifyJWT, deleteCertificate);
export { router as certificateRouter };