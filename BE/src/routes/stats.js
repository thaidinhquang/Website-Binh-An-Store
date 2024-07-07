import { Router } from "express";
import {
  ordersStatisticsByYear,
  orderStatisticsByMonth,
  commonStatistics,
} from "../controllers/stats.js";

const router = Router();

router.get("/", commonStatistics);
router.get("/orders-by-month", orderStatisticsByMonth);
router.get("/orders-by-year", ordersStatisticsByYear);

export default router;
