import { Router } from "express";
import {
  addNewDetail,
  deleteDetail,
  getAllDetail,
  getDetail,
  updateDetail,
} from "../controllers/Detail.js";

const router = Router();

router.get("/", getAllDetail);
router.get("/:id", getDetail);
router.post("/", addNewDetail);
router.patch("/:id", updateDetail);
router.delete("/:id", deleteDetail);

export default router;
