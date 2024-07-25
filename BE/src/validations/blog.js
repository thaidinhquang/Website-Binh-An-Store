import Joi from 'joi';

export const BlogValid = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  image: Joi.string().required(),
});