import { Router } from "express";
import { getUserByToken, signIn, signUp } from "../controllers/auth.js";
import { checkRequestBody } from "../middlewares/checkRequestBody.js";
import { loginSchema, registerSchema } from "../validations/auth.js";
import { getUser } from "../middlewares/getUser.js";

const routerAuth = Router();
routerAuth.post("/sign-up", checkRequestBody(registerSchema), signUp);
routerAuth.post("/sign-in", checkRequestBody(loginSchema), signIn);
routerAuth.use(getUser)
routerAuth.get("/", getUserByToken);

export default routerAuth;