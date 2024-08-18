import { Router } from "express";
import {
  addNewCategory,
  getAllCategory,
  getCategory,
  updateCategory,
} from "../controllers/categories.js";

const router = Router();
router.get("/", getAllCategory);
router.get("/:id", getCategory);
router.post("/", addNewCategory);
router.patch("/:id", updateCategory);

export default router;
