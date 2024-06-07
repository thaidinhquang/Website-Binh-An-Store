import Role from "../models/Role.js";
import { validBody } from "../utils/validBody.js";
import { roleSchema } from "../validations/role.js";

export const getAllRole = async (req, res, next) => {
    try {
        const data = await Role.find();
        return !data ? res.status(400).json({ message: "Get all role failed" }) : res.status(200).json({ data })
    } catch (error) {
        next(error);
    }
}

export const createRole = async (req, res, next) => {
    try {
        const errors = validBody(req.body, roleSchema);
        if (errors) {
            return res.status(400).json({
                message: "Validation errors",
                errors,
            });
        }
        const data = await Role.create(req.body);
        return !data ? res.status(500).json({ message: "Create role failed" }) : res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
};

export const getRoleByName = async (req, res, next) => {
    try {
        const data = await Role.find({ name: req.params.name });
        return !data ? res.status(500).json({ message: "Get role by name failed" }) : res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
};

export const removeRoleById = async (req, res, next) => {
    try {
        const data = await Role.findByIdAndDelete(req.params.id);
        return !data ? res.status(500).json({ message: "Remove role failed" }) : res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
};

export const updateRole = async (req, res, next) => {
    try {
        const errors = validBody(req.body, roleSchema);
        if (errors) {
            return res.status(400).json({
                message: "Validation errors",
                errors,
            });
        }
        const data = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return !data ? res.status(500).json({ message: "Update role failed" }) : res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
};

export const getRoleById = async (req, res, next) => {
    try {
        const data = await Role.findById(req.params.id);
        return !data ? res.status(500).json({ message: "Get role by id failed" }) : res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
}

export const getRoleByUserId = async (req, res, next) => {
    try {
        const data = await Role.find({ userId: req.params.userId });
        return !data ? res.status(500).json({ message: "Get role by userId failed" }) : res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
}