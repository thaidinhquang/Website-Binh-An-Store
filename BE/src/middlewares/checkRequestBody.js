import { validBody } from "../utils/validBody.js";

export const checkRequestBody = (schema) => {
    return async (req, res, next) => {
        try {
            const errors = validBody(req.body, schema);
            if (errors) {
                return res.status(400).json({
                    message: "Validation errors",
                    errors,
                });
            }
            next();
        } catch (error) {
            next(error);
        }
    };
}