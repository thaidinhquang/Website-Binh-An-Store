import Product from "../models/Product.js";


export const createProductReview = async (req, res) => {
  const productId = req.params.id;
  const {  comment, rating } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const newReview = {
      // name: req.user.name, 
      comment,
      rating,
      user: req.user._id
    };
    product.reviews.push(newReview);

    await product.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({
      message: "Server error: " + error.message,
    });
  }
};


const getAllReviews = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product.reviews);
  } catch (error) {
    res.status(500).json({
      message: "Server error: " + error.message,
    });
  }
};