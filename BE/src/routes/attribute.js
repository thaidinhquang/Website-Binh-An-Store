
import { Router } from "express";
import {
    createAttribute,
    createValueAttribute,
    deleteAttribute,
    getAllAttributes,
    getAttributeById,
    updateAttribute,
} from "../controllers/attribute.js";

const routerAtrribute = Router();
// Route để tạo mới một thuộc tính
routerAtrribute.post("/", createAttribute);

// Route để thêm giá trị cho thuộc tính đã tồn tại
routerAtrribute.post("/:id/values", createValueAttribute);

// Route để lấy tất cả các thuộc tính
routerAtrribute.get("/", getAllAttributes);

// Route để lấy một thuộc tính theo ID
routerAtrribute.get("/attributes/:id", getAttributeById);

// Route để cập nhật một thuộc tính theo ID
routerAtrribute.put("/attributes/:id", updateAttribute);

// Route để xóa một thuộc tính theo ID
routerAtrribute.delete("/attributes/:id", deleteAttribute);

export default routerAtrribute;
