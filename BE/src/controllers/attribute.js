import Attribute, { ValueAttributeModel } from "../models/attribute.js";

// Controller để tạo mới một thuộc tính
export const createAttribute = async (req, res) => {
    try {
        const { name } = req.body;
        const attribute = new Attribute({
            name,
        });
        const newAttribute = await attribute.save();
        res.status(201).json(newAttribute);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller để lấy tất cả các thuộc tính
export const getAllAttributes = async (req, res) => {
    try {
        const attributes = await Attribute.find().populate("values");
        res.json(attributes);
    } catch (error) {
        res.status(500).json({ message: error.message });
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
        res.status(500).json({ message: error.message });
    }
};

// Controller để cập nhật một thuộc tính
export const updateAttribute = async (req, res) => {
    try {
        const { name } = req.body;
        const attribute = await Attribute.findById(req.params.id);
        if (!attribute) {
            return res.status(404).json({ message: "Attribute not found" });
        }
        attribute.name = name;
        const updatedAttribute = await attribute.save();
        res.json(updatedAttribute);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller để xóa một thuộc tính
// Controller để "xóa" (vô hiệu hóa) một thuộc tính
export const deleteAttribute = async (req, res, next) => {
    try {
        const attribute = await Attribute.findByIdAndUpdate(req.params.id, { active: false }, { new: true });
        if (!attribute) {
            return res.status(404).json({ message: "Attribute not found" });
        }
        res.status(200).json({ data: attribute, message: "Attribute deactivated" });
    } catch (error) {
        next(error);
    }
};


//==================================== VALUE ============================================

// Controller để tạo mới một giá trị của thuộc tính
export const createValueAttribute = async (req, res) => {
    try {
        const { name, price, quantity } = req.body;
        const attribute = await Attribute.findById(req.params.id);
        if (!attribute) {
            return res.status(404).json({ message: "Attribute not found" });
        }
        const valueAttribute = new ValueAttributeModel({
            name,
            price,
            quantity,
        });
        const newValueAttribute = await valueAttribute.save();
        attribute.values.push(newValueAttribute);
        await attribute.save();
        res.status(201).json(newValueAttribute);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller để lấy tất cả các giá trị của thuộc tính
export const getAllValueAttributes = async (req, res) => {
    try {
        const values = await ValueAttributeModel.find();
        res.json(values);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller để lấy một giá trị của thuộc tính theo ID
export const getValueAttributeById = async (req, res) => {
    try {
        const value = await ValueAttributeModel.findById(req.params.id);
        if (!value) {
            return res.status(404).json({ message: "ValueAttribute not found" });
        }
        res.json(value);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller để cập nhật một giá trị của thuộc tính
export const updateValueAttribute = async (req, res) => {
    try {
        const { name, price, quantity} = req.body;
        const value = await ValueAttributeModel.findById(req.params.id);
        if (!value) {
            return res.status(404).json({ message: "ValueAttribute not found" });
        }
        value.name = name;
        value.price = price !== undefined ? price : value.price; // Cập nhật nếu có giá trị mới, giữ giá trị cũ nếu không có
        value.quantity = quantity !== undefined ? quantity : value.quantity; // Cập nhật nếu có giá trị mới, giữ giá trị cũ nếu không có
        const updatedValue = await value.save();
        res.json(updatedValue);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller để xóa một giá trị của thuộc tính
// Controller để "xóa" (vô hiệu hóa) một giá trị của thuộc tínhx
export const deleteValueAttribute = async (req, res, next) => {
    try {
        const value = await ValueAttributeModel.findByIdAndUpdate(req.params.id, { active: false }, { new: true });
        if (!value) {
            return res.status(404).json({ message: "ValueAttribute not found" });
        }
        res.status(200).json({ data: value, message: "ValueAttribute deactivated" });
    } catch (error) {
        next(error);
    }
};
