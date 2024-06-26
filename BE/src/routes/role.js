import { Router } from "express";
import { createRole, getAllRole, getRoleByName, removeRoleById, updateRole } from "../controllers/role.js";
import { checkPermission } from "../middlewares/checkPermission.js";

const routerRole = Router();
routerRole.get("/", getAllRole);
routerRole.get("/:id", getRoleByName);
routerRole.post("/", checkPermission('create_role'), createRole);
routerRole.patch("/:id", checkPermission('update_role'), updateRole);
routerRole.delete("/:id", checkPermission('delete_role'), removeRoleById);

export default routerRole;