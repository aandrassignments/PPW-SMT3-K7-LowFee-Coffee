import type { HttpContext } from '@adonisjs/core/http'
import Cart from '#models/cart'
import Transaction from '#models/transaction'
import TransactionItem from '#models/transaction_item'

export default class TransactionsController {
    async show({view, params}:HttpContext){
        const transaction=await Transaction.query().where('id', params.id).preload('items', (query)=>query.preload('product')).firstOrFail()
        return view.render('pages/transaction-details',{transaction})
    }

    async store ({response}:HttpContext){
        const userId=1
        const cartItems=await Cart.query().where('user_id', userId).preload('product')

        if (cartItems.length===0){
            return response.badRequest({message:'cart is empty'})
        }

        let totalPrice=0
        
        for (const item of cartItems){
            const product=item.product
            if (!product){
                return response.badRequest({message: `Product not found for cart item ${item.id}`})
            }
            if (item.quantity>product.stock){
                return response.badRequest({message: `Not enough stock for ${product.name}`})
            }
            totalPrice+=product.price*item.quantity
        }

        const transaction=await Transaction.create({userId, totalPrice, paymentStatus: 'pending'})
        for (const item of cartItems){
            const product=item.product
            await TransactionItem.create({transactionId:transaction.id, productId:product.id, quantity:item.quantity, priceEach:product.price})
            product.stock-=item.quantity
            await product.save()
        }

        await Cart.query().where('user_id', userId).delete()
        return response.ok({message: 'Transaction completed successfully!',transactionId: transaction.id,totalPrice,})
    }
}