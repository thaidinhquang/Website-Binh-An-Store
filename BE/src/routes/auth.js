import { Router } from "express";
import { checkOTP, getUserByToken, resetPassword, sendOTP, signIn, signUp } from "../controllers/auth.js";
import { checkRequestBody } from "../middlewares/checkRequestBody.js";
import { otpSchema, registerSchema, resetPasswordSchema } from "../validations/auth.js";
import { getUser } from "../middlewares/getUser.js";

const routerAuth = Router();
routerAuth.post("/send-otp", checkRequestBody(otpSchema), sendOTP);
routerAuth.post("/check-otp", checkRequestBody(otpSchema), checkOTP);
routerAuth.post("/reset-password", checkRequestBody(resetPasswordSchema), resetPassword);
routerAuth.post("/sign-up", checkRequestBody(registerSchema), signUp);
routerAuth.post("/sign-in", signIn);
routerAuth.use(getUser)
routerAuth.get("/", getUserByToken);

export default routerAuth;