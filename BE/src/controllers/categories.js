import Category from "../models/Category.js";

export const addNewCategory = async (req, res, next) => {
  try {
    const existingCategory = await Category.findOne({ name: req.body.name });
    if (existingCategory) {
      return res.status(400).json({ message: 'Tên của danh mục đã tồn tại' });
    }

    const category = await Category.create(req.body);
    return res.status(201).json({ message: 'Tạo danh mục thành công', category });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const existingCategory = await Category.findOne({ name: req.body.name, _id: { $ne: req.params.id } });
    if (existingCategory) {
      return res.status(400).json({ message: 'Tên của danh mục đã tồn tại' });
    }

    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json({ message: 'Cập nhật danh mục thành công', category });
  } catch (error) {
    next(error);
  }
};

export const getAllCategory = async (req, res, next) => {
  try {
    const categories = await Category.find({}).populate({
      path: "details",
      select: "-_id -__v -createdAt -updatedAt",
    });
    return res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

import mongoose from 'mongoose';

export const getAllCategoryWithDetails = async (req, res, next) => {
  try {
    const { query, sort } = req.query;
    let filter = {};
    let sortOption = {};

    if (query) {
      filter = {
        $or: [
          mongoose.Types.ObjectId.isValid(query) ? { _id: query } : null,
          { name: { $regex: query, $options: 'i' } } // Case-insensitive search
        ].filter(Boolean) // Remove null values
      };
    }

    if (sort) {
      sortOption.createdAt = sort === 'old' ? 1 : -1; // 1 for ascending (old to new), -1 for descending (new to old)
    }

    const categories = await Category.find(filter)
      .populate({
        path: 'details',
        select: 'key'
      })
      .sort(sortOption);

    return res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

export const getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id).populate({
      path: "details",
      select: "-_id -__v -createdAt -updatedAt",
    });

    return res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

export const getCategoryDetails = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id).populate({
      path: 'details',
      select: 'key'
    })
    return res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};