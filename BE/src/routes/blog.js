import { Router } from "express";
import { checkRequestBody } from "../middlewares/checkRequestBody.js";
import { createBlog, getAllBlogs, getOneBlogById, removeBlog, restoreBlog, updateBlog } from "../controllers/blog.js";
import { BlogValid } from "../validations/blog.js";

const routerBlog = Router();

routerBlog.get("/", getAllBlogs);
routerBlog.get("/:id", getOneBlogById);
routerBlog.delete("/:id", removeBlog);
routerBlog.delete("/restore/:id", restoreBlog);
routerBlog.post("/", createBlog);
routerBlog.put("/:id", updateBlog);

export default routerBlog;