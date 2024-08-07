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
        message: "Sản phẩm này đã đánh giá",
      });
    }
    // review object
    const review = {
      email:req.user.email,
      name: req.user.name,
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




export const deleteProductReview = async (req, res) => {
  try {
    const productId  = req.params.id
    // Tìm sản phẩm theo ID
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Tìm index của review cần xóa
    const reviewIndex = product.reviews.findIndex(review => review._id.toString() === req.params.reviewId);
    if (reviewIndex === -1) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Xóa review khỏi mảng reviews
    product.reviews.splice(reviewIndex, 1);

    // Cập nhật số lượng review và rating trung bình
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.numReviews;

    // Lưu sản phẩm sau khi đã xóa review
    await product.save();

    res.json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllReviews = async (req, res) => {
  try {
    // Lấy tất cả các sản phẩm
    const products = await Product.find();

    // Lấy tất cả các đánh giá từ các sản phẩm
    const allReviews = products.reduce((acc, product) => {
      return acc.concat(product.reviews.map(review => ({
        ...review._doc,
        productId: product._id,
        productName: product.name
      })));
    }, []);

    // Trả về danh sách tất cả các đánh giá
    res.status(200).send({
      success: true,
      reviews: allReviews,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get All Reviews API",
      error,
    });
  }
};


// Cập nhật đánh giá sản phẩm


export const updateProductReview = async (req, res) => {
  try {
    const productId = req.params.id;
    const reviewId = req.params.reviewId;
    const { comment, rating } = req.body;

    // Tìm sản phẩm theo ID
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    // Tìm index của đánh giá cần cập nhật
    const reviewIndex = product.reviews.findIndex(review => review._id.toString() === reviewId);
    if (reviewIndex === -1) {
      return res.status(404).send({
        success: false,
        message: "Review not found",
      });
    }

    // Kiểm tra xem người dùng có phải là người đã viết đánh giá không
    const review = product.reviews[reviewIndex];
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).send({
        success: false,
        message: "You are not authorized to update this review",
      });
    }

    // Kiểm tra giới hạn số lần cập nhật
    if (review.updateCount >= 2) {
      return res.status(403).send({
        success: false,
        message: "You have reached the maximum number of updates for this review",
      });
    }

    // Cập nhật đánh giá
    review.comment = comment || review.comment;
    review.rating = rating ? Number(rating) : review.rating;
    review.updateCount += 1; // Tăng giá trị updateCount

    // Cập nhật số lượng đánh giá và điểm trung bình
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.numReviews;

    // Lưu sản phẩm sau khi cập nhật đánh giá
    await product.save();

    res.status(200).send({
      success: true,
      message: "Review updated successfully",
      review,
    });
  } catch (error) {
    console.log(error);
    if (error.name === "CastError") {
      return res.status(400).send({
        success: false,
        message: "Invalid product or review ID",
      });
    }
    res.status(500).send({
      success: false,
      message: "Error in updating review",
      error,
    });
  }
};






export const getReviewUser = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;

    // Tìm sản phẩm chứa đánh giá bằng cách tìm tất cả sản phẩm có đánh giá với ID review
    const product = await Product.findOne({ "reviews._id": reviewId }).populate('reviews.user', 'name email');

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Review not found",
      });
    }

    // Tìm đánh giá trong mảng reviews của sản phẩm
    const review = product.reviews.id(reviewId);

    if (!review) {
      return res.status(404).send({
        success: false,
        message: "Review not found",
      });
    }

    // Trả về thông tin đánh giá và sản phẩm
    res.status(200).send({
      success: true,
      review: {
        ...review.toObject(),
        productId: product._id,
        productName: product.name,
      }
    });
  } catch (error) {
    console.log(error);
    if (error.name === "CastError") {
      return res.status(400).send({
        success: false,
        message: "Invalid review ID",
      });
    }
    res.status(500).send({
      success: false,
      message: "Error in getting review",
      error,
    });
  }
};
