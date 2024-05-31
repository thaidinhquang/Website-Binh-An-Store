import { Router } from "express";
import routerAuth from "./auth.js";
import routerRole from "./role.js";

const router = Router();

router.use("/auth", routerAuth);
router.use("/role", routerRole);

export default router;
