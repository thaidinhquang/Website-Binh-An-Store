import { Router } from "express";
import {
  cancelOrder,
  checkoutSession,
  confirmedOrder,
  createOrder,
  finishAnOrder,
  getAllOrders,
  getAllOrdersByUser,
  getOrderDetails,
} from "../controllers/order.js";
import { getUser } from "../middlewares/getUser.js";
import { checkPermission } from "../middlewares/checkPermission.js";
import { ROLES } from "../constants/Role.js";

const router = Router();

router.post("/create-checkout-session", getUser, checkoutSession);
router.post("/", getUser, createOrder);
router.get("/", getUser, getAllOrders);
router.get("/by_user", getUser, getAllOrdersByUser);
router.get("/:orderId", getUser, getOrderDetails);
router.patch("/cancel", getUser, cancelOrder);
router.patch("/confirm", getUser, confirmedOrder);
router.patch("/done", getUser, finishAnOrder);

export default router;
