import vine from '@vinejs/vine'

export const CartStoreValidator = vine.compile(
    vine.object({
        productId: vine.number(),
        quantity: vine.number().min(1)
    })
)

export const CartUpdateValidator = vine.compile(
    vine.object({
        quantity:vine.number().min(1)
    })
)