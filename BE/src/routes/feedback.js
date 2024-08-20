
import { Router } from "express";
import { createFeedback, dislikeFeedback, getFeedbacks, likeFeedback } from "../controllers/feedback.js";
import { getUser } from "../middlewares/getUser.js";
import { checkRequestBody } from "../middlewares/checkRequestBody.js";
import { feedbackSchema } from "../validations/feedback.js";
const routerFeedback = Router();
// Route để tạo mới một thuộc tính
routerFeedback.get("/", getFeedbacks);
routerFeedback.post("/like", getUser, likeFeedback);
routerFeedback.post("/dislike", getUser, dislikeFeedback);
routerFeedback.use(checkRequestBody(feedbackSchema))
routerFeedback.post("/", createFeedback);

export default routerFeedback;