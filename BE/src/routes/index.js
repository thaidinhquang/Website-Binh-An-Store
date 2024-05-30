import { Router } from "express";
import routerAuth from "./auth.js";

const router = Router();

router.use("/auth", routerAuth);

export default router;
