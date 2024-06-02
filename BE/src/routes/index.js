import { Router } from "express";
import routerCategory from "./categories.js";
import routerProduct from "./product.js";



const router = Router();

router.use("/categories", routerCategory);
router.use("/products", routerProduct);

export default router;