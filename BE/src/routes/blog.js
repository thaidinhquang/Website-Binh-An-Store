import { Router } from "express";
import { checkRequestBody } from "../middlewares/checkRequestBody.js";
import { createBlog, getAllBlogs, getOneBlogById, removeBlog, restoreBlog, updateBlog } from "../controllers/blog.js";
import { BlogValid } from "../validations/blog.js";
import { checkPermission } from "../middlewares/checkPermission.js";

const routerBlog = Router();

routerBlog.get("/", getAllBlogs);
routerBlog.get("/:id", getOneBlogById);
routerBlog.delete("/:id", removeBlog);
routerBlog.delete("/restore/:id", restoreBlog);
routerBlog.use(checkRequestBody(BlogValid));
routerBlog.post("/", createBlog);
routerBlog.put("/:id", updateBlog);

export default routerBlog;