import { Router } from "express";
import { checkRequestBodyCategory } from "../middlewares/checkRequestBodyCategory.js";
import {
  createCategory,
  getAllCategory,
  getOneCategoryById,
  getOneCategoryByName,
  getOneCategoryBySlug,
  removeCategory,
  updateCategory,
} from "../controllers/categories.js";

const routerCategory = Router();
routerCategory.get("/", getAllCategory);
routerCategory.get("/:id", getOneCategoryById);
routerCategory.get("/slug/:slug", getOneCategoryBySlug);
routerCategory.get("/name/:name", getOneCategoryByName);

routerCategory.delete("/:id", removeCategory);

routerCategory.use(checkRequestBodyCategory);
routerCategory.post("/", createCategory);
routerCategory.put("/:id", updateCategory);

export default routerCategory;
