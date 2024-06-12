import { Router } from "express";
import { createRole, getAllRole, getRoleById, getRoleByName, removeRoleById, updateRole } from "../controllers/role.js";
import { checkPermission } from "../middlewares/checkPermission.js";
import { checkRequestBody } from "../middlewares/checkRequestBody.js";
import { roleSchema } from "../validations/role.js";

const routerRole = Router();
routerRole.get("/", getAllRole);
routerRole.get("/:id", getRoleById);
routerRole.get("/name/:name", getRoleByName);
routerRole.delete("/:id", checkPermission('delete_role'), removeRoleById);
routerRole.use(checkRequestBody(roleSchema))
routerRole.post("/", checkPermission('create_role'), createRole);
routerRole.put("/:id", checkPermission('update_role'), updateRole);

export default routerRole;