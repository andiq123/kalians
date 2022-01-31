/* eslint-disable prettier/prettier */
import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  STAGE: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  TELEGRAM_BOT_TOKEN: Joi.string().required(),
  TELEGRAM_BOT_NAME: Joi.string().required(),
  CACHE_TIME: Joi.number().default(3600),
  CACHE_MAX: Joi.number().default(100),
  JWT_SECRET: Joi.string().required(),
  CLOUDINARY_API_SECRET: Joi.string().required(),
  CLOUDINARY_API_KEY: Joi.string().required(),
  CLOUDINARY_CLOUD_NAME: Joi.string().required(),
});
