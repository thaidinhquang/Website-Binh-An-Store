import Brand from "../models/Brand.js";

export const createBrand = async (req, res, next) => {
  try {
    const data = await Brand.create(req.body);
    return !data ? res.status(400).json({ message: "Create category failed!" }) : res.status(200).json({ data, message: "Create Brand successfully"})
  } catch (error) {
    next(error)
  }
};

export const updateBrand = async (req, res, next) => {
  try {
    const data = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return !data ? res.status(400).json({ message: "Update category failed!" }) : res.status(200).json({ data, message: "Update Brand successfully"})
  } catch (error) {
    next(error)
  }
};

export const getAllBrand = async (req, res, next) => {
  try {
    let sort = { createdAt: -1 }; // Default sort order
    if (req.query.sort) {
      const [key, value] = req.query.sort.split(':');
      sort = { [key]: Number(value) };
    }
    const options = {
      page: req.query.page ? +req.query.page : 1,
      limit: req.query.limit ? +req.query.limit : 10,
      sort,
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
    const data = await Brand.paginate(query, options);
    return !data ? res.status(400).json({ message: "Khong tim thay danh muc nao!" }) : res.status(200).json({ data })
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
    return !data ? res.status(400).json({ message: "Delete Brand failed!" }) : res.status(200).json({ data, message: "Delete Brand successfully"})
  } catch (error) {
    next(error)
  }
};

export const restoreBrand = async (req, res, next) => {
  try {
    const data = await Brand.findByIdAndUpdate(req.params.id, { active: true }, { new: true });
    return !data ? res.status(400).json({ message: "Restore Brand failed!" }) : res.status(200).json({ data, message: "Restore Brand successfully"})
  }
  catch (error) {
    next(error)
  }
}