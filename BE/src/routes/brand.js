import { Router } from "express";
import { checkRequestBody } from "../middlewares/checkRequestBody.js";
import { createBrand, getAllBrand, getOneBrandById, removeBrand, restoreBrand, updateBrand } from "../controllers/brand.js";
import { BrandValid } from "../validations/brandValid.js";

const routerBrand = Router();
routerBrand.get("/", getAllBrand);
routerBrand.get("/:id", getOneBrandById);
routerBrand.delete("/:id", removeBrand);
routerBrand.delete("/restore/:id", restoreBrand);
routerBrand.use(checkRequestBody(BrandValid))
routerBrand.post("/", createBrand);
routerBrand.put("/:id", updateBrand);

export default routerBrand;
