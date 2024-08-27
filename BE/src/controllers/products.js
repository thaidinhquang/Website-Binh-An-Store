import { populate } from "dotenv";
import Category from "../models/Category.js";
import Brand from "../models/Brand.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";
import ProductItem from "../models/ProductItem.js";


export const getAllProduct = async (req, res, next) => {
  try {
    const options = {
      page: req.query.page ? +req.query.page : 1,
      limit: req.query.limit ? +req.query.limit : 10,
      sort: req.query.sort ? req.query.sort : { createdAt: -1 },
      populate: [
        { path: "category" },
        { path: "brand" },
        {
          path: "attributes",
          populate: { path: "values", select: "name price quantity active" },
        },
      ],
    };

    let query = {};
    if (req.query.id) {
      query._id = req.query.id;
    }
    if (req.query.name) {
      query.name = { $regex: new RegExp(req.query.name, "i") };
    }
    if (req.query.slug) {
      query.slug = { $regex: new RegExp(req.query.slug, "i") };
    }
    if (req.query.categories) {
      const categoryIds = req.query.categories.split(",");
      query.category = { $in: categoryIds };
    }
    if (req.query.brand) {
      const brandIds = req.query.brand.split(",");
      query.brand = { $in: brandIds };
    }
    if (req.query.attributes) {
      const attributesIds = req.query.attributes.split(",");
      query.attributes = { $in: attributesIds };
    }
    if (req.query.active) {
      query.active = req.query.active === "true";
    }

    const products = await Product.paginate(query, options);

    // Fetch all ProductItems for the retrieved products
    const productIds = products.docs.map(product => product._id);
    const productItems = await ProductItem.find({ productId: { $in: productIds } });

    // Group ProductItems by ProductId
    const productItemsByProduct = productItems.reduce((acc, item) => {
      if (!acc[item.productId]) {
        acc[item.productId] = [];
      }
      acc[item.productId].push(item);
      return acc;
    }, {});

    // Attach ProductItems to their respective Products
    products.docs = products.docs.map(product => ({
      ...product.toObject(),
      productItems: productItemsByProduct[product._id] || [],
    }));

    return res.status(200).json({
      data: products,
      message: "Lấy danh sách sản phẩm thành công",
    });
  } catch (error) {
    next(error);
  }
};

export const getDetailProductPopulate = async (req, res, next) => {
  try {
    const data = await Product.findById(req.params.id).populate("brand").populate("category");
    const productItems = await ProductItem.find({ productId: data._id });

    return !data
      ? res.status(400).json({ message: "Khong tim thay san pham!" })
      : res.status(200).json({ data: { ...data.toObject(), productItems } }); // Đưa productItems vào bên trong data
  } catch (error) {
    next(error);
  }
};

export const getDetailProduct = async (req, res, next) => {
  try {
    const data = await Product.findById(req.params.id);
    const productItems = await ProductItem.find({ productId: data._id });
    return !data
      ? res.status(400).json({ message: "Khong tim thay san pham!" })
      : res.status(200).json({ data: { ...data.toObject(), productItems } });
  } catch (error) {
    next(error);
  }
};

export const getProductRelated = async (req, res, next) => {
  try {
    const data = await Product.findById(req.params.id);
    const products = await Product.find({
      category: data.category,
      _id: { $ne: data._id },
    })
      .sort({ createdAt: -1 }) // Sort by newest
      .limit(4); // Limit to 4 products

    if (!products) {
      return res.status(400).json({ message: "Không tìm thấy sản phẩm liên quan!" });
    }

    // Extract product IDs
    const productIds = products.map(product => product._id);

    // Fetch ProductItems
    const productItems = await ProductItem.find({ productId: { $in: productIds } });

    // Group ProductItems by ProductId
    const productItemsByProduct = productItems.reduce((acc, item) => {
      if (!acc[item.productId]) {
        acc[item.productId] = [];
      }
      acc[item.productId].push(item);
      return acc;
    }, {});

    // Attach ProductItems to their respective Products
    const productsWithItems = products.map(product => ({
      ...product.toObject(),
      productItems: productItemsByProduct[product._id] || [],
    }));

    return res.status(200).json({ data: { docs: productsWithItems } });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const data = await Product.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true }
    );
    return !data
      ? res.status(400).json({ message: "Xoa that bai!" })
      : res.status(200).json({ data, message: "Xoa thanh cong!" });
  } catch (error) {
    next(error);
  }
};

export const restoreProduct = async (req, res, next) => {
  try {
    const data = await Product.findByIdAndUpdate(
      req.params.id,
      { active: true },
      { new: true }
    );
    return !data
      ? res.status(400).json({ message: "Khoi phuc that bai!" })
      : res.status(200).json({ data, message: "Khoi phuc thanh cong!" });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const {
      name,
      image,
      status,
      gallery,
      parameter,
      description,
      discount,
      featured,
      tags,
      slug,
      attributes,
      active,
      category,
      brand,
      variants,
    } = req.body;
    const checkProductName = Product.findOne({name: name});
    if (checkProductName) {
      return res.status(500).json({ message: "Tên đã tồn tại" });
    }
    const product = new Product({
      name,
      image,
      status,
      gallery,
      parameter,
      description,
      discount,
      featured,
      tags,
      slug,
      attributes,
      active,
      category,
      brand,
    });

    const savedProduct = await product.save({ session });

    const productItems = variants.map((variant) => ({
      productId: savedProduct._id,
      price: variant.price,
      image: variant.image,
      stock: variant.stock,
      variants: variant.variants,
    }));

    await ProductItem.insertMany(productItems, { session });
    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      message: "Product and product items added successfully",
      product: savedProduct,
      productItems,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const productData = req.body;

    // Step 1: Update the Product
    const updatedProduct = await Product.findByIdAndUpdate(id, productData, {
      new: true, // Return the updated document
      session, // Use the session for this operation
    });

    if (!updatedProduct) {
      throw new Error("Product not found");
    }

    // Step 2: Update or Create ProductItems
    const updatedProductItems = [];

    for (const item of productData.variants) {
      if (item._id) {
        // If the product item already exists, update it
        const updatedItem = await ProductItem.findByIdAndUpdate(
          item._id,
          {
            price: item.price,
            image: item.image,
            stock: item.stock,
            variants: item.variants,
          },
          {
            new: true, // Return the updated document
            session, // Use the session for this operation
          }
        );

        if (!updatedItem) {
          throw new Error(`ProductItem with id ${item._id} not found`);
        }
        updatedProductItems.push(updatedItem);
      } else {
        // If the product item is new, create it
        const newItem = new ProductItem({
          productId: id, // Reference the updated product
          price: item.price,
          image: item.image,
          stock: item.stock,
          variants: item.variants,
        });

        const savedItem = await newItem.save({ session });
        updatedProductItems.push(savedItem);
      }
    }

    // Optionally: Handle deletion of removed product items
    // For example, delete items that were not included in productItemsData:
    await ProductItem.deleteMany(
      {
        productId: id,
        _id: { $nin: updatedProductItems.map((item) => item._id).filter(Boolean) },
      },
      { session }
    );

    await session.commitTransaction(); // Commit the transaction
    session.endSession();

    res.status(200).json({
      message: "Cập nhật thành công",
      product: updatedProduct,
      productItems: updatedProductItems,
    });
  } catch (error) {
    await session.abortTransaction(); // Abort the transaction in case of error
    session.endSession();

    res.status(500).json({ error: error.message });
  }
};