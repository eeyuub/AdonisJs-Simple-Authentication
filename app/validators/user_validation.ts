import vine from '@vinejs/vine'
import Joi from 'joi';

/* export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(6),
    email: vine.string().email().normalizeEmail(),
    password: vine.string().trim().minLength(8),
    roleId: vine.number(),
  })
) */

export const createUserValidator = Joi.object({
  fullName: Joi.string().trim().min(3).max(30).required(),
  email: Joi.string().email().normalize().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9@.]{3,30}$')).required(),
  roleId: Joi.number(),
});

export const registerUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(6),
    email: vine.string().email().normalizeEmail(),
    password: vine.string().trim().minLength(8),
  })
)

export const loginUserValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().trim().minLength(8),
  })
)
