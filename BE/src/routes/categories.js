import { Router } from "express";
import { createCategory, getAllCategory, getOneCategoryById, getOneCategoryByName, getOneCategoryBySlug, removeCategory, restoreCategory, updateCategory } from "../controllers/categories.js";
import { checkRequestBody } from "../middlewares/checkRequestBody.js";
import { categoryValid } from "../validations/categoryValid.js";

const routerCategory = Router();
routerCategory.get("/", getAllCategory);
routerCategory.get("/:id", getOneCategoryById);
routerCategory.get("/slug/:slug", getOneCategoryBySlug);
routerCategory.get("/name/:name", getOneCategoryByName);
routerCategory.delete("/:id", removeCategory);
routerCategory.delete("/restore/:id", restoreCategory);
routerCategory.use(checkRequestBody(categoryValid))
routerCategory.post("/", createCategory);
routerCategory.put("/:id", updateCategory);

export default routerCategory;
