import Category from "../models/Category.js";

export const createCategory = async (req, res) => {
  try {
    const data = await Category.create(req.body);
    return !data ? res.status(400).json({ message: "Create category failed!" }) : res.status(200).json({ data })
  } catch (error) {
    next(error)
  }
};

export const updateCategory = async (req, res) => {
  try {
    const data = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return !data ? res.status(400).json({ message: "Update category failed!" }) : res.status(200).json({ data })
  } catch (error) {
    next(error)
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const data = await Category.find();
    return !data ? res.status(400).json({ message: "Khong tim thay danh muc nao!" }) : res.status(200).json({ data })
  } catch (error) {
    next(error)
  }
};

export const getOneCategoryById = async (req, res) => {
  try {
    const data = await Category.findById(req.params.id).populate("products");
    return !data ? res.status(400).json({ message: "Khong tim thay danh muc!" }) : res.status(200).json({ data })
  } catch (error) {
    next(error)
  }
};

export const getOneCategoryBySlug = async (req, res) => {
  try {
    const data = await Category.findOne({ slug: req.params.slug }).populate("products");
    return !data ? res.status(400).json({ message: "Khong tim thay danh muc!" }) : res.status(200).json({ data })
  } catch (error) {
    next(error)
  }
};

export const getOneCategoryByName = async (req, res) => {
  try {
    const data = await Category.findOne({ name: req.params.name });
    return !data ? res.status(400).json({ message: "Khong tim thay danh muc!" }) : res.status(200).json({ data })
  } catch (error) {
    next(error)
  }
};

export const removeCategory = async (req, res) => {
  try {
    const data = await Category.findByIdAndUpdate(req.params.id, { active: false }, { new: true });
    return !data ? res.status(400).json({ message: "Delete category failed!" }) : res.status(200).json({ data })
  } catch (error) {
    next(error)
  }
};

export const restoreCategory = async (req, res) => {
  try {
    const data = await Category.findByIdAndUpdate(req.params.id, { active: true }, { new: true });
    return !data ? res.status(400).json({ message: "Restore category failed!" }) : res.status(200).json({ data })
  }
  catch (error) {
    next(error)
  }
}