import Category from "../models/Category.js";
import Product from "../models/Product.js";

export const getAllProduct = async (req, res) => {
  try {
    const data = await Product.find().populate("category");
    return !data ? res.status(400).json({ message: "Khong tim thay san pham nao!" }) : res.status(200).json({ data })
  } catch (error) {
    next(error)
  }
};

export const getDetailProduct = async (req, res) => {
  try {
    const data = await Product.findById(req.params.id).populate("category");
    return !data ? res.status(400).json({ message: "Khong tim thay san pham!" }) : res.status(200).json({ data })
  } catch (error) {
    next(error)
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const data = await Product.findByIdAndUpdate(req.params.id, { active: false }, { new: true });
    return !data ? res.status(400).json({ message: "Xoa that bai!" }) : res.status(200).json({ data })
  } catch (error) {
    next(error)
  }
};

export const restoreProduct = async (req, res) => {
  try {
    const data = await Product.findByIdAndUpdate(req.params.id, { active: true }, { new: true });
    return !data ? res.status(400).json({ message: "Khoi phuc that bai!" }) : res.status(200).json({ data })
  } catch (error) {
    next(error)
  }
}

export const createProduct = async (req, res) => {
  try {
    const data = await Product.create(req.body);
    await Category.findByIdAndUpdate(data.category, { $push: { products: data._id } });
    return !data ? res.status(400).json({ message: "Create product failed!" }) : res.status(200).json({ data })
  } catch (error) {
    next(error)
  }
};

export const updateProduct = async (req, res) => {
  try {
    const data = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return !data ? res.status(400).json({ message: "Update product failed!" }) : res.status(200).json({ data })
  } catch (error) {
    next(error)
  }
};