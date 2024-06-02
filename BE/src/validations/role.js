import Joi from "joi";

export const roleSchema = Joi.object({
    name: Joi.string().min(3).required(),
}).unknown();