import Joi from "joi";

export const feedbackSchema = Joi.object({
    name: Joi.string().min(3).required().messages({
        "string.base": "Name must be a string!",
        "string.empty": "Name is not allowed to be empty!",
        "string.min": "Name must be at least 3 characters long!"
    }),
    message: Joi.string().min(10).required().messages({
        "string.base": "Message must be a string!",
        "string.empty": "Message is not allowed to be empty!",
        "string.min": "Message must be at least 10 characters long!"
    }),
}).unknown();