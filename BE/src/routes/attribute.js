import { Router } from "express";
import {
    createAttribute,
    createValueAttribute,
    deleteAttribute,
    deleteValueAttribute,
    getAllAttributes,
    getAttributeById,
    getValueAttributeById,
    restoreAttribute,
    restoreValueAttribute,
    updateAttribute,
    updateValueAttribute,
} from "../controllers/attribute.js";
import { getUser } from "../middlewares/getUser.js";

const routerAttribute = Router();

// Route để tạo mới một thuộc tính
routerAttribute.post("/", getUser, createAttribute);

// Route để thêm giá trị cho thuộc tính đã tồn tại
routerAttribute.post("/:id/values", getUser, createValueAttribute);

// Route để lấy tất cả các thuộc tính
routerAttribute.get("/", getAllAttributes);

// Route để lấy một thuộc tính theo ID
routerAttribute.get("/:id", getAttributeById);

// Route để lấy giá trị một thuộc tính theo ID
routerAttribute.get("/:id/values", getValueAttributeById);

// Route để cập nhật một thuộc tính theo ID
routerAttribute.put("/:id", getUser, updateAttribute);

// Route để sửa giá trị cho thuộc tính đã tồn tại
routerAttribute.put("/:id/values", getUser, updateValueAttribute);

// Route để xóa một thuộc tính theo ID
routerAttribute.delete("/:id", getUser, deleteAttribute);

// Route để xóa giá trị cho thuộc tính đã tồn tại
routerAttribute.delete("/:id/values", getUser, deleteValueAttribute);

// Route để khôi phục một thuộc tính
routerAttribute.patch("/restore/:id", getUser, restoreAttribute);

// Route để khôi phục giá trị cho thuộc tính
routerAttribute.patch("/restore/:id/values", getUser, restoreValueAttribute);

export default routerAttribute;