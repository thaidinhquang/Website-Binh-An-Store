import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import Role from "../models/Role.js";
dotenv.config();

const { SECRET_KEY } = process.env;

export const getUser = (perrmisson) => {
    return async (req, res, next) => {
        try {
            const authorization = req.headers?.authorization;
            if (!authorization) {
                return res.status(403).json({
                    message: "Authorization header is missing",
                });
            }

            const token = authorization.split(" ")[1];
            const decoded = jwt.verify(token, SECRET_KEY);
            if (!decoded) {
                return res.status(403).json({
                    message: "Invalid token",
                });
            }

            const user = await User.findById(decoded._id);
            if (!user) {
                return res.status(403).json({
                    message: "User does not exist",
                });
            }
            req.userId = user._id
            next();
        } catch (error) {
            next(error);
        }
    };
}