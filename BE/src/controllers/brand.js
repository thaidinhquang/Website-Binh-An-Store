import mongoose from "mongoose";
import Brand from "../models/Brand.js";

export const createBrand = async (req, res, next) => {
  try {
    const data = await Brand.create(req.body);
    return !data ? res.status(400).json({ message: "Thêm nhãn hàng thất bại" }) : res.status(200).json({ data, message: "Thêm nhãn hàng thành công"})
  } catch (error) {
    next(error)
  }
};

export const updateBrand = async (req, res, next) => {
  try {
    const data = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return !data ? res.status(400).json({ message: "Cập nhật nhãn hàng thất bại" }) : res.status(200).json({ data, message: "Cập nhật nhãn hàng thành công"})
  } catch (error) {
    next(error)
  }
};

export const getAllBrand = async (req, res, next) => {
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
    const data = await Brand.paginate(query, options);
    return !data ? res.status(400).json({ message: "Không tìm thấy nhãn hàng nào!" }) : res.status(200).json({ data, message: "Lấy danh sách nhãn hàng thành công" });
  } catch (error) {
    next(error)
  }
}


export const getOneBrandById = async (req, res, next) => {
  try {
    const data = await Brand.findById(req.params.id).populate("products");
    return !data ? res.status(400).json({ message: "Khong tim thay Brand!" }) : res.status(200).json({ data })
  } catch (error) {
    next(error)
  }
};

export const getOneBrandBySlug = async (req, res, next) => {
  try {
    const data = await Brand.findOne({ slug: req.params.slug }).populate("products");
    return !data ? res.status(400).json({ message: "Khong tim thay Brand!" }) : res.status(200).json({ data })
  } catch (error) {
    next(error)
  }
};

export const getOneBrandByName = async (req, res, next) => {
  try {
    const data = await Brand.findOne({ name: req.params.name });
    return !data ? res.status(400).json({ message: "Khong tim thay brand!" }) : res.status(200).json({ data })
  } catch (error) {
    next(error)
  }
};

export const removeBrand = async (req, res, next) => {
  try {
    const data = await Brand.findByIdAndUpdate(req.params.id, { active: false }, { new: true });
    return !data ? res.status(400).json({ message: "Xóa nhãn hàng thất bại" }) : res.status(200).json({ data, message: "Xóa nhãn hàng thành công"})
  } catch (error) {
    next(error)
  }
};

export const restoreBrand = async (req, res, next) => {
  try {
    const data = await Brand.findByIdAndUpdate(req.params.id, { active: true }, { new: true });
    return !data ? res.status(400).json({ message: "Khôi phục nhãn hàng thất bại" }) : res.status(200).json({ data, message: "Khôi phục nhãn hàng thành công"})
  }
  catch (error) {
    next(error)
  }
}