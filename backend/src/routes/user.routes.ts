import express from "express";
import { addFavorite, removeFavorite, getFavorites, deleteMe } from "../controllers/user.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/favorites/:animalId", authenticate, addFavorite);
router.delete("/favorites/:animalId", authenticate, removeFavorite);
router.get("/favorites", authenticate, getFavorites);
router.delete("/me", authenticate, deleteMe);

export default router;
