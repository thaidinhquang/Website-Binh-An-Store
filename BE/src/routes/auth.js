import { Router } from "express";
import { signUp } from "../controllers/auth.js";

const routerAuth = Router();
routerAuth.get("/sign-in", signUp);

export default routerAuth;