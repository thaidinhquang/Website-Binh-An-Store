import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.js";

const routerAuth = Router();
routerAuth.post("/sign-up", signUp);
routerAuth.post("/sign-in", signIn);

export default routerAuth;