import vine from '@vinejs/vine'



export const CheckPasswordResetAttributes = vine.compile(
  vine.object({
    oldPassword: vine.string().trim().minLength(8),
    newPassword: vine.string().trim().minLength(8),
    confirmePassword: vine.string().trim().minLength(8),
  })
)

export const CheckPasswordResetSendingRequestAttributes = vine.compile(
  vine.object({
    email: vine.string().trim().email().normalizeEmail(),
  })
)

