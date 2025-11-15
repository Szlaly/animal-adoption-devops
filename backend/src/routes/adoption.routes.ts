import express from "express";
import { authenticate, requireAdmin } from "../middleware/auth.middleware";
import {
  getAllAdoptions,
  submitAdoptionRequest,
  updateAdoptionStatus,
  getMyAdoptions,
} from "../controllers/adoption.controller";

const router = express.Router();

router.post("/", authenticate, submitAdoptionRequest);
router.get("/", authenticate, requireAdmin, getAllAdoptions);
router.get("/me", authenticate, getMyAdoptions); 
router.put("/:id", authenticate, requireAdmin, updateAdoptionStatus);

export default router;
