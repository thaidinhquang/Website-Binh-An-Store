
import { Router } from "express";
import { createProductReview, deleteProductReview, getAllReviews, getProductReviews, getReviewUser, updateProductReview} from "../controllers/review.js";
import { getUser } from "../middlewares/getUser.js";

const routerReview = Router();
// Route để tạo mới một thuộc tính
routerReview.post("/:id", getUser, createProductReview);
routerReview.get("/:id",  getUser, getProductReviews)
routerReview.get("/", getAllReviews)
routerReview.put("/:id/:reviewId",getUser, updateProductReview)
routerReview.delete("/:id/:reviewId",  getUser, deleteProductReview);
routerReview.get("/:id/:reviewId",getUser,  getReviewUser);



export default routerReview;