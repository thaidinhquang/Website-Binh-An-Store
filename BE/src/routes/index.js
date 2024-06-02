import { Router } from "express";
import routerCategory from "./categories.js";



const router = Router();

router.use("/categories", routerCategory);


export default router;