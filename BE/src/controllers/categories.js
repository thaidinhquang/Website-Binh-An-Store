import mongoose from "mongoose";
import Category from "../models/Category.js";

export const createCategory = async (req, res, next) => {
  try {
    const data = await Category.create(req.body);
    return !data ? res.status(400).json({ message: "Thêm danh mục thất bại!" }) : res.status(200).json({ data, message: "Thêm danh mục thành công!"})
  } catch (error) {
    next(error)
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const data = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return !data ? res.status(400).json({ message: "Cập nhật danh mục thất bại!" }) : res.status(200).json({ data, message: "Cập nhật danh mục thành công!"})
  } catch (error) {
    next(error)
  }
};

export const getAllCategory = async (req, res, next) => {
  try {
    const options = {
      page: req.query.page ? +req.query.page : 1,
      limit: req.query.limit ? +req.query.limit : 10,
      sort: req.query.sort ? req.query.sort : { createdAt: -1 },
    };
    let query = {};
    if (req.query.query) {
      if (mongoose.Types.ObjectId.isValid(req.query.query)) {
        query._id = new mongoose.Types.ObjectId(req.query.query);
      } else {
        query.name = { $regex: new RegExp(req.query.query, 'i') };
      }
    }
    if (req.query.slug) {
      query.slug = { $regex: new RegExp(req.query.slug, 'i') };
    }
    if (req.query.active) {
      query.active = req.query.active === 'true';
    }
    const data = await Category.paginate(query, options);
    return !data ? res.status(400).json({ message: "Không tìm thấy danh mục nào!" }) : res.status(200).json({ data, message: "Lấy danh sách danh mục thành công" });
  } catch (error) {
    next(error)
  }
}

export const getOneCategoryById = async (req, res, next) => {
  try {
    const data = await Category.findById(req.params.id).populate("products");
    return !data ? res.status(400).json({ message: "Khong tim thay danh muc!" }) : res.status(200).json({ data })
  } catch (error) {
    next(error)
  }
};

export const getOneCategoryBySlug = async (req, res, next) => {
  try {
    const data = await Category.findOne({ slug: req.params.slug }).populate("products");
    return !data ? res.status(400).json({ message: "Khong tim thay danh muc!" }) : res.status(200).json({ data })
  } catch (error) {
    next(error)
  }
};

export const getOneCategoryByName = async (req, res, next) => {
  try {
    const data = await Category.findOne({ name: req.params.name });
    return !data ? res.status(400).json({ message: "Khong tim thay danh muc!" }) : res.status(200).json({ data })
  } catch (error) {
    next(error)
  }
};

export const removeCategory = async (req, res, next) => {
  try {
    const data = await Category.findByIdAndUpdate(req.params.id, { active: false }, { new: true });
    return !data ? res.status(400).json({ message: "Vô hiệu hóa category thất bại!" }) : res.status(200).json({ data, message: "Vô hiệu hóa category thành công"})
  } catch (error) {
    next(error)
  }
};

export const restoreCategory = async (req, res, next) => {
  try {
    const data = await Category.findByIdAndUpdate(req.params.id, { active: true }, { new: true });
    return !data ? res.status(400).json({ message: "Khôi phục category thất bại!" }) : res.status(200).json({ data, message: "Khôi phục category thành công"})
  }
  catch (error) {
    next(error)
  }
}