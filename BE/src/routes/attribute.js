
import { Router } from "express";
import {
    createAttribute,
    createValueAttribute,
    deleteAttribute,
    deleteValueAttribute,
    getAllAttributes,
    getAttributeById,
    getValueAttributeById,
    updateAttribute,
    updateValueAttribute,
} from "../controllers/attribute.js";
import { getUser } from "../middlewares/getUser.js";

const routerAtrribute = Router();
// Route để tạo mới một thuộc tính
routerAtrribute.post("/",getUser, createAttribute);

// Route để thêm giá trị cho thuộc tính đã tồn tại
routerAtrribute.post("/:id/values",getUser, createValueAttribute);

// Route để lấy tất cả các thuộc tính
routerAtrribute.get("/", getAllAttributes);

// Route để lấy một thuộc tính theo ID
routerAtrribute.get("/:id", getAttributeById);

// Route để lấy giá trị một thuộc tính theo ID
routerAtrribute.get("/:id/values", getValueAttributeById);

// Route để cập nhật một thuộc tính theo ID
routerAtrribute.put("/:id",getUser, updateAttribute);

// Route để sửa giá trị cho thuộc tính đã tồn tại
routerAtrribute.put("/:id/values",getUser, updateValueAttribute);

// Route để xóa một thuộc tính theo ID
routerAtrribute.delete("/:id", deleteAttribute);

// Route để xóa giá trị cho thuộc tính đã tồn tại
routerAtrribute.delete("/:id/values",getUser, deleteValueAttribute);



export default routerAtrribute;
