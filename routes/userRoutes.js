import express from "express";
import { login, logout, register } from "../controllers/userController.js";
import validateToken from "../middleware/validateToken.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.post('/logout', validateToken, logout);

export default router;