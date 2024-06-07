import { Router } from "express";
import routerAuth from "./auth.js";
import routerRole from "./role.js";
import routerCategory from "./categories.js";
import routerProduct from "./product.js";

const router = Router();

router.use("/auth", routerAuth);
router.use("/role", routerRole);
router.use("/categories", routerCategory);
router.use("/products", routerProduct);
export default router;