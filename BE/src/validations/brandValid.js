import Joi from "joi";

export const BrandValid = Joi.object({
  name: Joi.string().required().min(1).max(255).messages({
    "string.base": "Name phải là một chuỗi!",
    "string.empty": "Name không được để trống!",
    "string.min": "Name phải có ít nhất 1 ký tự!",
    "string.max": "Name không được quá 255 ký tự!",
  }),
  description: Joi.string().allow(null, "").max(255).messages({
    "string.base": "Description phải là một chuỗi!",
    "string.max": "Description không được quá 255 ký tự!",
  }),
  category: Joi.string().required().messages({
    "string.base": "Category phải là một chuỗi!",
    "string.empty": "Category không được để trống!",
  }),
}).unknown();
