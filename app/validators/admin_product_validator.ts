import vine from '@vinejs/vine'

export const AdminCreateProductValidator = vine.compile(
    vine.object({
        name:vine.string().trim().minLength(2),
        description:vine.string().trim().minLength(5),
        category:vine.string().trim(),
        price:vine.number().min(0),
        stock:vine.number().min(0),
        imageUrl:vine.string().url().optional()
    })
)

export const AdminUpdateProductValidator = vine.compile(
    vine.object({
        name:vine.string().trim().minLength(2).optional(),
        description:vine.string().trim().minLength(5).optional(),
        category:vine.string().trim().optional(),
        price:vine.number().min(0).optional(),
        stock:vine.number().min(0).optional(),
        imageUrl:vine.string().url().optional()
    })
)