import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(6),
    email: vine.string().email(),
    password: vine.string().trim().minLength(8),
  })
)

export const loginUserValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().trim().minLength(8),
  })
)
