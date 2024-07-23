
import { Router } from "express";
import { createProductReview} from "../controllers/review.js";
import { getUser } from "../middlewares/getUser.js";

const routerReview = Router();
// Route để tạo mới một thuộc tính
routerReview.post("/:id", getUser, createProductReview);



export default routerReview;