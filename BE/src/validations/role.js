import Joi from "joi";

export const roleSchema = Joi.object({
    name: Joi.string().required().min(3).messages({
        "string.base": "Name phải là một chuỗi!",
        "string.empty": "Name không được để trống!",
        "string.min": "Name phải có ít nhất 3 ký tự!",
    }),
}).unknown();