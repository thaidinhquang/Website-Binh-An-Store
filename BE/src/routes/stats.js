import { Router } from "express";
import {
  ordersStatisticsByYear,
  orderStatisticsByMonth,
  commonStatistics,
  getTopSellingProducts,
  getLeastSellingProducts,
  getTopCustomers
} from "../controllers/stats.js";

const router = Router();

// Existing routes
router.get("/", commonStatistics);
router.get("/orders-by-month", orderStatisticsByMonth);
router.get("/orders-by-year", ordersStatisticsByYear);

// New routes
router.get("/top-selling-products", getTopSellingProducts);
router.get("/least-selling-products", getLeastSellingProducts);
router.get("/top-customers", getTopCustomers);

export default router;