import Role from "../models/Role.js";

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
        const checkRoleName = await Role.findOne({ name: req.body.name });
        if (checkRoleName) {
            return res.status(400).json({ message: "Role name is already in use" });
        }
        const data = await Role.create(req.body);
        return !data ? res.status(500).json({ message: "Create role failed" }) : res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
};

export const getRoleByName = async (req, res, next) => {
    try {
        const data = await Role.findOne({ name: req.params.name });
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