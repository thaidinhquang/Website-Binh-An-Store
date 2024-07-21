import { Router } from "express";
import { checkRequestBody } from "../middlewares/checkRequestBody.js";
import { createBrand, getAllBrand, getOneBrandById, getOneBrandByName, getOneBrandBySlug, removeBrand, restoreBrand, updateBrand } from "../controllers/brand.js";
import { BrandValid } from "../validations/brandValid.js";
import { checkPermission } from "../middlewares/checkPermission.js";

const routerBrand = Router();
routerBrand.get("/", getAllBrand);
routerBrand.get("/:id", getOneBrandById);
routerBrand.get("/slug/:slug", getOneBrandBySlug);
routerBrand.get("/name/:name", getOneBrandByName);
routerBrand.delete("/:id", removeBrand);
routerBrand.delete("/restore/:id", restoreBrand);
routerBrand.use(checkRequestBody(BrandValid))
routerBrand.post("/", createBrand);
routerBrand.put("/:id", updateBrand);

export default routerBrand;
