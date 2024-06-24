import Joi from "joi";

export const userSchema = Joi.object({
    email: Joi.string().required().email().messages({
        "string.base": "Email phải là một chuỗi!",
        "string.empty": "Email không được để trống!",
        "string.email": "Email không đúng định dạng!",
    }),
}).unknown();