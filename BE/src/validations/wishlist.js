import Joi from "joi";

export const wishlistSchema = Joi.object({
    userId: Joi.string().required().messages({
        "string.base": "UserId phải là một chuỗi!",
        "string.empty": "UserId không được để trống!",
    }),
    products: Joi.array().items(Joi.object({
        _id: Joi.string().required().messages({
            "string.base": "ProductId phải là một chuỗi!",
            "string.empty": "ProductId không được để trống!",
        }),
    })).required().messages({
        "array.base": "Products phải là một mảng!",
        "array.empty": "Products không được để trống!",
    }),
})