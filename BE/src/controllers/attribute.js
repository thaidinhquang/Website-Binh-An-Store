import Attribute, { ValueAttributeModel } from "../models/attribute.js";

// Hàm helper để xử lý lỗi
const handleError = (res, error) => {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
};

// Controller để tạo mới một thuộc tính
export const createAttribute = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }
        const attribute = new Attribute({ name });
        const newAttribute = await attribute.save();
        res.status(201).json(newAttribute);
    } catch (error) {
        handleError(res, error);
    }
};

// Controller để lấy tất cả các thuộc tính
export const getAllAttributes = async (req, res) => {
    try {
        const attributes = await Attribute.find().populate("values");
        res.json(attributes);
    } catch (error) {
        handleError(res, error);
    }
};

// Controller để lấy một thuộc tính theo ID
export const getAttributeById = async (req, res) => {
    try {
        const attribute = await Attribute.findById(req.params.id).populate("values");
        if (!attribute) {
            return res.status(404).json({ message: "Attribute not found" });
        }
        res.json(attribute);
    } catch (error) {
        handleError(res, error);
    }
};

// Controller để cập nhật một thuộc tính
export const updateAttribute = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }
        const attribute = await Attribute.findByIdAndUpdate(
            req.params.id,
            { name },
            { new: true }
        );
        if (!attribute) {
            return res.status(404).json({ message: "Attribute not found" });
        }
        res.json(attribute);
    } catch (error) {
        handleError(res, error);
    }
};

// Controller để "xóa" (vô hiệu hóa) một thuộc tính
export const deleteAttribute = async (req, res) => {
    try {
        const attribute = await Attribute.findByIdAndUpdate(
            req.params.id,
            { active: false },
            { new: true }
        );
        if (!attribute) {
            return res.status(404).json({ message: "Attribute not found" });
        }
        res.status(200).json({ data: attribute, message: "Attribute deactivated" });
    } catch (error) {
        handleError(res, error);
    }
};

// Tương tự, cập nhật các hàm xử lý ValueAttribute...

// Controller để khôi phục một thuộc tính
export const restoreAttribute = async (req, res) => {
    try {
        const attribute = await Attribute.findByIdAndUpdate(
            req.params.id,
            { active: true },
            { new: true }
        );
        if (!attribute) {
            return res.status(404).json({ message: "Attribute not found" });
        }
        res.status(200).json({ data: attribute, message: "Attribute restored successfully" });
    } catch (error) {
        handleError(res, error);
    }
};

// Tương tự, cập nhật hàm restoreValueAttribute...