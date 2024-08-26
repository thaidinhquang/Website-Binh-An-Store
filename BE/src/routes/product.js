import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getDetailProduct,
  getDetailProductPopulate,
  getProductRelated,
  restoreProduct,
  updateProduct,
} from "../controllers/products.js";
import { productValid } from "../validations/productValid.js";
import { checkRequestBody } from "../middlewares/checkRequestBody.js";
import { checkPermission } from "../middlewares/checkPermission.js";

const routerProduct = Router();
routerProduct.get("/", getAllProduct);
routerProduct.get("/:id", getDetailProductPopulate);
routerProduct.get("/related/:id", getProductRelated);
routerProduct.get("/not-populate/:id", getDetailProduct);
routerProduct.delete("/:id", checkPermission("delete_product"), deleteProduct);
routerProduct.delete(
  "/restore/:id",
  checkPermission("restore_product"),
  restoreProduct
);
routerProduct.use(checkRequestBody(productValid));
routerProduct.post("/", createProduct);
routerProduct.put("/:id", checkPermission("update_product"), updateProduct);

export default routerProduct;
