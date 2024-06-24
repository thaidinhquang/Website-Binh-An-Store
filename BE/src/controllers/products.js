import Category from "../models/Category.js";
import Product from "../models/Product.js";

export const getAllProduct = async (req, res, next) => {
  try {
    const options = {
      page: req.query.page ? +req.query.page : 1,
      limit: req.query.limit ? +req.query.limit : 10,
    };
    let query = {};
    if (req.query.name) {
      query.name = { $regex: new RegExp(req.query.name, 'i') };
    }
    if (req.query.slug) {
      query.slug = { $regex: new RegExp(req.query.slug, 'i') };
    }
    if (req.query.active) {
      query.active = req.query.active;
    }
    const data = await Product.paginate(query, options).populate("category");
    return !data ? res.status(400).json({ message: "Khong tim thay san pham nao!" }) : res.status(200).json({ data })
  } catch (error) {
    next(error)
  }
};

export const getDetailProduct = async (req, res, next) => {
  try {
    const data = await Product.findById(req.params.id).populate("category");
    return !data ? res.status(400).json({ message: "Khong tim thay san pham!" }) : res.status(200).json({ data })
  } catch (error) {
    next(error)
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const data = await Product.findByIdAndUpdate(req.params.id, { active: false }, { new: true });
    return !data ? res.status(400).json({ message: "Xoa that bai!" }) : res.status(200).json({ data })
  } catch (error) {
    next(error)
  }
};

export const restoreProduct = async (req, res, next) => {
  try {
    const data = await Product.findByIdAndUpdate(req.params.id, { active: true }, { new: true });
    return !data ? res.status(400).json({ message: "Khoi phuc that bai!" }) : res.status(200).json({ data })
  } catch (error) {
    next(error)
  }
}

export const createProduct = async (req, res, next) => {
  try {
    const data = await Product.create(req.body);
    await Category.findByIdAndUpdate(data.category, { $push: { products: data._id } });
    return !data ? res.status(400).json({ message: "Create product failed!" }) : res.status(200).json({ data })
  } catch (error) {
    next(error)
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const data = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return !data ? res.status(400).json({ message: "Update product failed!" }) : res.status(200).json({ data })
  } catch (error) {
    next(error)
  }
};