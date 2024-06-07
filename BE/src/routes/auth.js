import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.js";
import { checkRequestBody } from "../middlewares/checkRequestBody.js";
import { loginSchema, registerSchema } from "../validations/auth.js";

const routerAuth = Router();
routerAuth.post("/sign-up", checkRequestBody(registerSchema), signUp);
routerAuth.post("/sign-in", checkRequestBody(loginSchema), signIn);

export default routerAuth;