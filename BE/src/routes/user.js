import { Router } from "express";
import { checkPermission } from "../middlewares/checkPermission.js";
import { createUser, getAllUser, getUserByEmail, getUserById, removeUserById, restoreUserById, updateUser, updateUserProfile } from "../controllers/user.js";
import { checkRequestBody } from "../middlewares/checkRequestBody.js";
import { userSchema } from "../validations/user.js";
import { getUser } from "../middlewares/getUser.js";

const routerUser = Router();
routerUser.get('/', checkPermission('get_user'), getAllUser);
routerUser.get('/:id', checkPermission('get_user'), getUserById);
routerUser.get('/email/:email', checkPermission('get_user'), getUserByEmail);
routerUser.delete('/:id', checkPermission('delete_user'), removeUserById);
routerUser.delete('/restore/:id', checkPermission('restore_user'), restoreUserById);
routerUser.use(checkRequestBody(userSchema));
routerUser.post('/', checkPermission('create_user'), createUser);
routerUser.put('/:id', checkPermission('update_user'), updateUser);
routerUser.patch('/', getUser, updateUserProfile);
export default routerUser;