import mongoose from "mongoose";
import Brand from "../models/Brand.js";

export const createBrand = async (req, res, next) => {
  try {
    const checkBrand = await Brand.findOne({ name: req.body.name });
    if (checkBrand) {
      return res.status(400).json({ message: "Brand đã tồn tại! vui lòng chọn tên khác" });
    }
    const data = await Brand.create(req.body);
    return !data ? res.status(400).json({ message: "Create category failed!" }) : res.status(200).json({ data, message: "Create Brand successfully" })
  } catch (error) {
    next(error)
  }
};

export const updateBrand = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const checkBrand = await Brand.findOne({ name, _id: { $ne: id } });
    if (checkBrand) {
      return res.status(400).json({ message: "Brand đã tồn tại! vui lòng chọn tên khác" });
    }
    const data = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return !data ? res.status(400).json({ message: "Update category failed!" }) : res.status(200).json({ data, message: "Update Brand successfully" })
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
      populate: [
        { path: 'category', select: 'name' }
      ]
    };
    let query = {};
    if (req.query.query) {
      query = {
        $or: [
          { name: { $regex: req.query.query, $options: "i" } },
          { _id: req.query.query }
        ]
      };
    }
    if (req.query.category) {
      query.category = new mongoose.Types.ObjectId(req.query.category);
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
    const data = await Brand.findById(req.params.id)
    return !data ? res.status(400).json({ message: "Khong tim thay Brand!" }) : res.status(200).json({ data })
  } catch (error) {
    next(error)
  }
};

export const removeBrand = async (req, res, next) => {
  try {
    const data = await Brand.findByIdAndUpdate(req.params.id, { active: false }, { new: true });
    return !data ? res.status(400).json({ message: "Vô hiệu hóa brand thất bại" }) : res.status(200).json({ data, message: "Vô hiệu hóa brand thành công" })
  } catch (error) {
    next(error)
  }
};

export const restoreBrand = async (req, res, next) => {
  try {
    const data = await Brand.findByIdAndUpdate(req.params.id, { active: true }, { new: true });
    return !data ? res.status(400).json({ message: "Khôi phục Brand thất bại" }) : res.status(200).json({ data, message: "Khôi phục brand thành công" })
  }
  catch (error) {
    next(error)
  }
}