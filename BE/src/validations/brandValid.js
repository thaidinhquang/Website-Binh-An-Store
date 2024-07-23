import Joi from "joi";

export const BrandValid = Joi.object({
  name: Joi.string().required().min(1).max(255).messages({
    "string.base": "Name phải là một chuỗi!",
    "string.empty": "Name không được để trống!",
    "string.min": "Name phải có ít nhất 1 ký tự!",
    "string.max": "Name không được quá 255 ký tự!",
  }),
}).unknown();
