import { Router } from "express";
import { addItemToCart, clearCart, decreaseItemQuantity, getCartByUserId, getCartCount, getCartTotal, increeaseItemQuantity, removeItemFromCart, updateItemInCart } from "../controllers/cart.js";
import { getUser } from "../middlewares/getUser.js";

const routerCart = Router();
// không cần truyền id vào params vì id đã lấy từ authorization header
routerCart.use(getUser)
routerCart.get("/", getCartByUserId);
routerCart.get("/count", getCartCount);
routerCart.get("/total", getCartTotal);
routerCart.post("/add-item", addItemToCart);
routerCart.post("/remove-item", removeItemFromCart);
routerCart.post("/update-item", updateItemInCart);
routerCart.post("/clear", clearCart);
routerCart.post("/increase-quantity", increeaseItemQuantity);
routerCart.post("/decrease-quantity", decreaseItemQuantity);

export default routerCart;