import { Router } from "express";
import { getUser } from "../middlewares/getUser.js";
import { addToWishlist, countWishlist, getProductInWishlist, getWislistByUserId, removeFromWishlist } from "../controllers/wishlist.js";

const routerWishlist = Router();
// không cần truyền id vào params vì id đã lấy từ authorization header
routerWishlist.use(getUser)
routerWishlist.get("/", getWislistByUserId);
routerWishlist.get("/products", getProductInWishlist);
routerWishlist.get("/count", countWishlist);
routerWishlist.post("/add", addToWishlist);
routerWishlist.post("/remove", removeFromWishlist);

export default routerWishlist;