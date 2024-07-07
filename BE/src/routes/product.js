import { Router } from "express";
import { createProduct, deleteProduct, getAllProduct, getDetailProduct, restoreProduct, updateProduct } from "../controllers/products.js";
import { productValid } from "../validations/productValid.js";
import { checkRequestBody } from "../middlewares/checkRequestBody.js";
import { checkPermission } from "../middlewares/checkPermission.js";

const routerProduct = Router();
routerProduct.get("/", getAllProduct);
routerProduct.get("/:id", getDetailProduct);
routerProduct.delete("/:id", checkPermission('delete_product'), deleteProduct);
routerProduct.delete("/restore/:id", checkPermission('restore_product'), restoreProduct);
routerProduct.use(checkRequestBody(productValid))
routerProduct.post("/", checkPermission('create_product'), createProduct);
routerProduct.put("/:id", checkPermission('update_product'), updateProduct);
export default routerProduct;
