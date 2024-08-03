import { populate } from "dotenv";
import Category from "../models/Category.js";
import Brand from "../models/Brand.js";
import Product from "../models/Product.js";
import mongoose from 'mongoose';

export const getAllProduct = async (req, res, next) => {
  try {
    const options = {
      page: req.query.page ? +req.query.page : 1,
      limit: req.query.limit ? +req.query.limit : 10,
      sort: req.query.sort ? req.query.sort : { createdAt: -1 },
      populate: [
        { path: 'category' },
        { path: 'brand' },
        { path: 'attributes', populate: { path: 'values', select: 'name price quantity active' }  }
      ]
    };
    let query = {};
    if (req.query.name) {
      query.name = { $regex: new RegExp(req.query.name, 'i') };
    }
    if (req.query.slug) {
      query.slug = { $regex: new RegExp(req.query.slug, 'i') };
    }
    if (req.query.slug) {
      query.slug = { $regex: new RegExp(req.query.slug, 'i') };
    }
    if (req.query.category) {
      const categoryIds = req.query.category.split(',');
      query.category = { $in: categoryIds };
    } 
    if (req.query.brand) {
      const brandIds = req.query.brand.split(',');
      query.brand = { $in: brandIds };
    }
    if (req.query.attributes) {
      const attributesIds = req.query.attributes.split(',');
      query.attributes = { $in: attributesIds };
    } 
    if (req.query.active) {
      query.active = req.query.active === 'true';
    }
    const data = await Product.paginate(query, options);
    return !data ? res.status(400).json({ message: "Không tìm thấy sản phẩm nào!" }) : res.status(200).json({ data, message: "Lấy danh sách sản phẩm thành công"});
  } catch (error) {
    next(error);
  }
};

export const getDetailProductPopulate = async (req, res, next) => {
  try {
    const data = await Product.findById(req.params.id).populate("category").populate("brand")  .populate({
      path: 'attributes',
      populate: { path: 'values', select: 'name price quantity active' } 
    });
    return !data ? res.status(400).json({ message: "Khong tim thay san pham!" }) : res.status(200).json({ data })
  } catch (error) {
    next(error)
  }
};

export const getDetailProduct = async (req, res, next) => {
  try {
    const data = await Product.findById(req.params.id)
    return !data ? res.status(400).json({ message: "Khong tim thay san pham!" }) : res.status(200).json({ data })
  } catch (error) {
    next(error)
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const data = await Product.findByIdAndUpdate(req.params.id, { active: false }, { new: true });
    return !data ? res.status(400).json({ message: "Xoa that bai!" }) : res.status(200).json({ data, message: "Xoa thanh cong!"})
  } catch (error) {
    next(error)
  }
};

export const restoreProduct = async (req, res, next) => {
  try {
    const data = await Product.findByIdAndUpdate(req.params.id, { active: true }, { new: true });
    return !data ? res.status(400).json({ message: "Khoi phuc that bai!" }) : res.status(200).json({ data, message: "Khoi phuc thanh cong!"})
  } catch (error) {
    next(error)
  }
}

export const createProduct = async (req, res, next) => {
  try {
    const { name } = req.body;

    // Check tên sản phẩm
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ message: "Tên sản phẩm đã tồn tại" });
    }

    const data = await Product.create(req.body);
    await Category.findByIdAndUpdate(data.category, { $push: { products: data._id } });
    return !data ? res.status(400).json({ message: "Thêm sản phẩm thất bại!" }) : res.status(200).json({ data, message: "Thêm sản phẩm thành công!"})
  } catch (error) {
    next(error)
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    // Check tên sản phẩm
    const existingProduct = await Product.findOne({ name, _id: { $ne: id } });
    if (existingProduct) {
      return res.status(400).json({ message: "Tên sản phẩm đã tồn tại" });
    }

    const data = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return !data ? res.status(400).json({ message: "Cập nhật sản phẩm thất bại!" }) : res.status(200).json({ data, message: "Cập nhật sản phẩm thành công!"})
  } catch (error) {
    next(error)
  }
};