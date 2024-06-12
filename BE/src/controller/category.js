
import { categorySchema } from '../schema/category';
import Category from '../model/category';
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        if (!categories) {
            return res.status(404).json({
                message: "Danh Mục Trống"
            });
        }
        return res.json(categories);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

export const getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({
                message: "Danh Mục không tồn tại"
            });
        }
        return res.json(category);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}


export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({
                message: "Danh mục đã được tạo trước đó"
            });
        }
        const { error } = categorySchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: error.details.map((err) => err.message)
            });
        }
        const category = await Category.create(req.body);
        return res.status(201).json(category);

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

export const removeCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({
                message: "Không tìm thấy danh mục để xóa"
            });
        }
        return res.json({
            message: "Xóa danh mục thành công",
            category,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}


export const updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const existingCategory = await Category.findOne({
            name,
            _id: { $ne: req.params.id }
        });
        if (existingCategory) {
            return res.status(400).json({
                message: "Danh mục đã được tạo trước đó"
            });
        }
        const category = await Category.findByIdAndUpdate(
            { _id: req.params.id },
            req.body,
            {
                new: true,
            }
        );
        if (!category) {
            return res.json({
                message: "Cập nhật danh mục không thành công"
            });
        }
        return res.json({
            message: "Cập nhật danh mục thành công",
            category,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}
