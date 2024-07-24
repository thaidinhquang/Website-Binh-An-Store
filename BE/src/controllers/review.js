import Product from "../models/Product.js";


export const createProductReview = async (req, res) => {
  try {
    const productId  = req.params.id
    const { comment, rating } = req.body;
    // find product
    const product = await Product.findById(productId);
    // check previous review
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      return res.status(400).send({
        success: false,
        message: "Product Alredy Reviewed",
      });
    }
    // review object
    const review = {
      // name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    // passing review object to reviews array
    product.reviews.push(review);
    // number or reviews
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    // save
    await product.save();
    res.status(200).send({
      success: true,
      message: "Review Added!",
    });
  } catch (error) {
    console.log(error);
    // cast error ||  OBJECT ID
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Id",
      });
    }
    res.status(500).send({
      success: false,
      message: "Error In Review Comment API",
      error,
    });
  }
};


export const getProductReviews = async (req, res) => {
  try {
    const productId = req.params.id;
    // Tìm sản phẩm theo ID
    const product = await Product.findById(productId).populate('reviews.user', 'name');
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }
    // Trả về danh sách đánh giá
    res.status(200).send({
      success: true,
      reviews: product.reviews,
    });
  } catch (error) {
    console.log(error);
    // Xử lý lỗi
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Id",
      });
    }
    res.status(500).send({
      success: false,
      message: "Error In Get Product Reviews API",
      error,
    });
  }
};