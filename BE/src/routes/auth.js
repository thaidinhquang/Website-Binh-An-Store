import { Router } from "express";
import { changePassword, getUserByToken, resetPassword, sendOTP, signIn, signUp } from "../controllers/auth.js";
import { checkRequestBody } from "../middlewares/checkRequestBody.js";
import { otpSchema, registerSchema, resetPasswordSchema } from "../validations/auth.js";
import { getUser } from "../middlewares/getUser.js";

const routerAuth = Router();
routerAuth.post("/send-otp", sendOTP);
routerAuth.post("/reset-password", checkRequestBody(resetPasswordSchema), resetPassword);
routerAuth.post("/sign-up", checkRequestBody(registerSchema), signUp);
routerAuth.post("/sign-in", signIn);
routerAuth.use(getUser)
routerAuth.get("/", getUserByToken);
routerAuth.post("/change-password", changePassword);

export default routerAuth;