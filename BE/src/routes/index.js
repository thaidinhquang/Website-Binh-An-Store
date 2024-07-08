import { Router } from "express";
import routerAuth from "./auth.js";
import routerRole from "./role.js";
import routerCategory from "./categories.js";
import routerProduct from "./product.js";
import routerCart from "./cart.js";
import routerUser from "./user.js";
import routerOrder from "./order.js";
import routerStats from "./stats.js";

const router = Router();

router.use("/auth", routerAuth);
router.use("/role", routerRole);
router.use("/categories", routerCategory);
router.use("/products", routerProduct);
router.use("/cart", routerCart);
router.use("/users", routerUser);
router.use("/orders", routerOrder);
router.use("/stats", routerStats);

export default router;
