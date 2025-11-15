import express from "express";
import { register, login, changePassword } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/change-password", authenticate, changePassword);
export default router;
