import { Router } from "express";
import {
  addNewCategory,
  getAllCategory,
  getAllCategoryWithDetails,
  getCategory,
  getCategoryDetails,
  updateCategory,
} from "../controllers/categories.js";

const router = Router();
router.get("/", getAllCategory);
router.get("/details", getAllCategoryWithDetails);
router.get("/:id", getCategory);
router.get("/details/:id", getCategoryDetails);
router.post("/", addNewCategory);
router.put("/:id", updateCategory);

export default router;
