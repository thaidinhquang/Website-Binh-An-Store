import { Router } from "express";
import {
  checkoutSession,
  createOrder,
  getAllOrdersByUser,
  getOrderDetails,
} from "../controllers/order.js";

const router = Router();

router.post("/create-checkout-session", checkoutSession);
router.post("/", createOrder);
router.get("/by_user/:userId", getAllOrdersByUser);
router.get("/:orderId", getOrderDetails);

export default router;
