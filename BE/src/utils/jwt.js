import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const { SECRET_KEY } = process.env;

export const token = (payload, expiresIn) => {
    const token = jwt.sign(payload, SECRET_KEY, {
        expiresIn: expiresIn || "1d",
    });

    return token;
};