import { Router } from "express";
import { createProduct, deleteProduct, getAllProduct, getDetailProduct, restoreProduct, updateProduct } from "../controllers/products.js";
import { productValid } from "../validations/productValid.js";
import { checkRequestBody } from "../middlewares/checkRequestBody.js";

const routerProduct = Router();
routerProduct.get("/", getAllProduct);
routerProduct.get("/:id", getDetailProduct);
routerProduct.delete("/:id", deleteProduct);
routerProduct.delete("/restore/:id", restoreProduct);
routerProduct.use(checkRequestBody(productValid))
routerProduct.post("/", createProduct);
routerProduct.put("/:id", updateProduct);
export default routerProduct;
