import { Router } from "express";
import { createContact, deleteForm, getForm, getsingleForm } from "../controllers/contact.controllers.js";
import verifyJWT from "../middleware/auth.middleware.js";
const router = Router();

router.route("/create").post(createContact);
router.route("/").post(verifyJWT, getForm);
router.route("/:id").get(verifyJWT, getsingleForm)
router.route("/:id").delete(verifyJWT, deleteForm)

export { router as contactRouter };
