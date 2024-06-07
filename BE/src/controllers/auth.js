import User from "../models/User.js";
import { token } from "../utils/jwt.js";
import { comparePassword, hashPassword } from "../utils/password.js";

export const signUp = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                message: "Email is already in use",
            });
        }

        const hashPasswordUser = await hashPassword(password);
        const user = await User.create({
            email,
            password: hashPasswordUser,
        });

        user.password = undefined;
        return res.status(201).json({
            message: "Register successfully",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({
                message: "Email is not found",
            });
        }

        const checkPassword = await comparePassword(password, userExist.password);
        if (!checkPassword) {
            return res.status(400).json({
                message: "Password is incorrect",
            });
        }

        const accessToken = token({ _id: userExist._id }, "365d");
        userExist.password = undefined;
        return res.status(200).json({
            message: "Login successfully!",
            accessToken,
            user: userExist,
        });
    } catch (error) {
        next(error);
    }
};