import vine from '@vinejs/vine'

export const UserUpdateValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(1),
    email: vine.string().trim().email(),
    password: vine.string().minLength(8).confirmed().optional()
  })
)