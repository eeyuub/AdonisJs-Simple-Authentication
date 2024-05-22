import vine from '@vinejs/vine'

export const CheckRoleAttributes = vine.compile(
  vine.object({
    role: vine.string().trim(),
  })
)

