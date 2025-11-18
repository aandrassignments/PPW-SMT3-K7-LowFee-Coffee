import vine from '@vinejs/vine'

/* export const adminCreateUserValidator=vine.compile(
    vine.object({
        fullName:vine.string().trim().minLength(1),
        email:vine.string().trim().email(),
        role:vine.enum(['user', 'admin'])
    })
) */

export const adminUpdateUserValidator=vine.compile(
    vine.object({
        fullName:vine.string().trim().minLength(1).optional(),
        email:vine.string().trim().email().optional(),
        role:vine.enum(['user', 'admin']).optional()
    })
)