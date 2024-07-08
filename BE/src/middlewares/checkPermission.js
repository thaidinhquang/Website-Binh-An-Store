import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import Role from "../models/Role.js";
dotenv.config();

const { SECRET_KEY } = process.env;

export const checkPermission = (perrmisson) => {
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
            if (user.active == false) {
                return res.status(403).json({
                    message: "User is not active",
                });
            }
            const userPermission = await Role.findOne({ name: user.role });
            if (!userPermission) {
                return res.status(403).json({
                    message: "User role does not exist",
                });
            }
            const value = userPermission[perrmisson]
            if (!value) {
                return res.status(403).json({
                    message: "You are not have permission to access this route",
                });
            }
            next();
        } catch (error) {
            next(error);
        }
    };
}