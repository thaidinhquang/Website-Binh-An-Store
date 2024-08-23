import { Router } from "express";
import { createCategory, getAllCategory, getOneCategoryById, getOneCategoryByName, getOneCategoryBySlug, removeCategory, restoreCategory, updateCategory } from "../controllers/categories.js";
import { checkRequestBody } from "../middlewares/checkRequestBody.js";
import { categoryValid } from "../validations/categoryValid.js";
import { checkPermission } from "../middlewares/checkPermission.js";

const routerCategory = Router();
routerCategory.get("/", getAllCategory);
routerCategory.get("/:id", getOneCategoryById);
routerCategory.get("/slug/:slug", getOneCategoryBySlug);
routerCategory.get("/name/:name", getOneCategoryByName);
routerCategory.delete("/:id", checkPermission('delete_category'), removeCategory);
routerCategory.delete("/restore/:id", checkPermission('restore_category'), restoreCategory);
routerCategory.use(checkRequestBody(categoryValid))
routerCategory.post("/", checkPermission('create_category'), createCategory);
routerCategory.put("/:id", checkPermission('update_category'), updateCategory);

export default routerCategory;
