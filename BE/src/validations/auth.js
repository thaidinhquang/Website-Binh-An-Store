import Joi from "joi";

export const registerSchema = Joi.object({
    email: Joi.string().email().pattern(new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')).required().messages({
        "string.base": "Email phải là một chuỗi!",
        "string.empty": "Email không được để trống!",
        "string.email": "Email không đúng định dạng!",
    }),
    password: Joi.string().min(6).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')).required().messages({
        "string.base": "Password phải là một chuỗi!",
        "string.empty": "Password không được để trống!",
        "string.min": "Password phải có ít nhất 6 ký tự!",
        "string.pattern.base": "Password phải chứa ít nhất 1 chữ thường, 1 chữ hoa, 1 số và 1 ký tự đặc biệt!",
    }),
}).unknown();

export const otpSchema = Joi.object({
    otp: Joi.number().required().messages({
        "number.base": "OTP phải là một số!",
        "number.empty": "OTP không được để trống!",
    }),
}).unknown();

export const resetPasswordSchema = Joi.object({
    password: Joi.string().min(6).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')).required().messages({
        "string.base": "Password phải là một chuỗi!",
        "string.empty": "Password không được để trống!",
        "string.min": "Password phải có ít nhất 6 ký tự!",
        "string.pattern.base": "Password phải chứa ít nhất 1 chữ thường, 1 chữ hoa, 1 số và 1 ký tự đặc biệt!",
    }),
}).unknown();