import User from "../models/User.js";
import { hashPassword } from "../utils/password.js";

export const getAllUser = async (req, res, next) => {
    try {
        const options = {
            page: req.query.page ? +req.query.page : 1,
            limit: req.query.limit ? +req.query.limit : 10,
        };
        let query = {};
        if (req.query.name) {
            query.name = { $regex: new RegExp(req.query.name, 'i') };
        }
        if (req.query.active) {
            query.active = req.query.active;
        }
        const data = await User.paginate(query, options);
        return !data ? res.status(400).json({ message: "Get all user failed" }) : res.status(200).json({ data })
    } catch (error) {
        next(error);
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const data = await User.findById(req.params.id);
        return !data ? res.status(500).json({ message: "Get user by id failed" }) : res.status(200).json({ data });
    }
    catch (error) {
        next(error);
    }
}

export const createUser = async (req, res, next) => {
    try {
        req.body.password = await hashPassword(req.body.password);
        const data = await User.create(req.body);
        return !data ? res.status(500).json({ message: "Create user failed" }) : res.status(201).json({ data });
    } catch (error) {
        next(error);
    }
}

export const removeUserById = async (req, res, next) => {
    try {
        const data = await User.findByIdAndUpdate(req.params.id, { active: false }, { new: true });
        return !data ? res.status(500).json({ message: "Remove user failed" }) : res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const data = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return !data ? res.status(500).json({ message: "Update user failed" }) : res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
}

export const restoreUserById = async (req, res, next) => {
    try {
        const data = await User.findByIdAndUpdate(req.params.id, { active: true }, { new: true });
        return !data ? res.status(500).json({ message: "Restore user failed" }) : res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
}

export const getUserByEmail = async (req, res, next) => {
    try {
        const data = await User.find({ email: req.params.email });
        return !data ? res.status(500).json({ message: "Get user by email failed" }) : res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
}