import vine from '@vinejs/vine'

export const WishlistStoreValidator = vine.compile(
    vine.object({
        productId:vine.number().positive().withoutDecimals()
    })
)