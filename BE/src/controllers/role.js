import Role from "../models/Role.js";
import { validBody } from "../utils/validBody.js";
import { roleSchema } from "../validations/role.js";

export const getAllRole = async (req, res, next) => {
    try {
        const data = await Role.find();
        if (data) {
            return res.status(200).json({
                message: "Get all role successfully",
                data,
            });
        }
        return res.status(400).json({
            message: "Get all role failed",
        });
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
        if (data) {
            return res.status(201).json({
                message: "Create role successfully",
                data,
            });
        }
        return res.status(500).json({
            message: "Create role failed",
        });
    } catch (error) {
        next(error);
    }
};

export const getRoleByName = async (req, res, next) => {
    try {
        const data = await Role.find({ name: req.params.name });
        if (data) {
            return res.status(200).json({
                message: "Get role by name successfully",
                data,
            });
        }
        return res.status(400).json({
            message: "Get role by name failed",
        });
    } catch (error) {
        next(error);
    }
};

export const removeRoleById = async (req, res, next) => {
    try {
        const data = await Role.findByIdAndDelete(req.params.id);
        if (data) {
            return res.status(200).json({
                message: "Remove role successfully",
                data,
            });
        }
        return res.status(400).json({
            message: "Remove role failed",
        });
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
        if (data) {
            return res.status(200).json({
                message: "Update role successfully",
                data,
            });
        }
        return res.status(400).json({
            message: "Update role failed",
        });
    } catch (error) {
        next(error);
    }
};