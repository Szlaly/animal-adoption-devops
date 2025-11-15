

import express from "express";
import {
  getAllAnimals,
  getAnimalById,
  createAnimal,
  updateAnimal,
  deleteAnimal,
  addUpdateToAnimal
} from "../controllers/animal.controller";
import { authenticate, requireAdmin } from "../middleware/auth.middleware";
import { upload } from "../middleware/upload.middleware";
const router = express.Router();

router.post("/:id/updates", authenticate, requireAdmin, addUpdateToAnimal);
router.get("/", getAllAnimals);
router.get("/:id", getAnimalById);
router.put(
  "/:id", 
  authenticate,
  requireAdmin,
  upload.single("image"),
  updateAnimal
);
router.put('/animals/:id', authenticate,requireAdmin,upload.single('image'), updateAnimal);
router.delete("/:id", authenticate, requireAdmin,deleteAnimal);
router.post(
  "/",
  authenticate,
  requireAdmin,
  upload.single("image"), 
  createAnimal
);
export default router;
