import express from "express";
import { register, login } from "../../../auth/src/controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
