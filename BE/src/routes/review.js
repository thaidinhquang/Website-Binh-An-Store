
import { Router } from "express";
import { createProductReview, deleteProductReview, getAllReviews, getProductReviews} from "../controllers/review.js";
import { getUser } from "../middlewares/getUser.js";

const routerReview = Router();
// Route để tạo mới một thuộc tính
routerReview.post("/:id", getUser, createProductReview);
routerReview.get("/:id", getProductReviews)
routerReview.get("/", getAllReviews)
routerReview.delete("/:id/:reviewId", deleteProductReview);


export default routerReview;