import type { HttpContext } from '@adonisjs/core/http'
import Cart from '#models/cart'
import Transaction from '#models/transaction'
import TransactionItem from '#models/transaction_item'

export default class TransactionsController {
    async index({view}:HttpContext){
        const userId = 1 //change to auth later
        const transactions=await Transaction.query().where('userId', userId).preload('items', (query)=>query.preload('product')).orderBy('created_at', 'desc')
        return view.render('pages/transactions/transactions_index',{transactions})
    }

    async show({view, params}:HttpContext){
        const transaction = await Transaction.query().where('id',params.id).preload('items', (query)=>query.preload('product')).firstOrFail() // when auth is working add where('userId', userId)
        return view.render('pages/transactions/transactions_details',{transaction})
    }

    async store ({response}:HttpContext){ //might need trx later ngl
        const userId=1
        const cartItems=await Cart.query().where('userId', userId).preload('product')
        if (cartItems.length===0){
            return response.badRequest({message:'cart is empty'}) //this'll flashbang the user with white blank page...
        }

        let totalPrice=0

        for (const item of cartItems){
            const product=item.product
            if (!product){
                return response.badRequest({message: `Product not found for cart item ${item.id}`}) //this'll flashbang the user with white blank page...
            }
            if (item.quantity>product.stock){
                return response.badRequest({message: `Not enough stock for ${product.name}`}) //this'll flashbang the user with white blank page...
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

        await Cart.query().where('userId', userId).delete()
        return response.redirect(`/transactions/${transaction.id}`)
    }
}