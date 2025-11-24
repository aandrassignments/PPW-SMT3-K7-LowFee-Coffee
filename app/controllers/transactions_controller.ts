import type { HttpContext } from '@adonisjs/core/http'
import Cart from '#models/cart'
import Transaction from '#models/transaction'
import TransactionItem from '#models/transaction_item'

export default class TransactionsController {
    async index({view,auth}:HttpContext){
        const user=auth.user!
        const transactions=await Transaction.query().where('userId', user.id).preload('items', (query)=>query.preload('product')).orderBy('created_at', 'desc')
        return view.render('pages/transactions/transactions_index',{transactions})
    }

    async show({view, params, auth}:HttpContext){
        const user=auth.user!
        const transaction = await Transaction.query().where('id',params.id).where('userId', user.id).preload('items', (query)=>query.preload('product')).firstOrFail()
        return view.render('pages/transactions/transactions_details',{transaction})
    }

    async store ({response, auth}:HttpContext){ //might need trx later ngl
        const user=auth.user!
        const cartItems=await Cart.query().where('userId', user.id).preload('product')
        if (cartItems.length===0){
            return response.redirect('/cart')
        }

        let totalPrice=0

        for (const item of cartItems){
            const product=item.product
            if (!product){
                return response.redirect('/cart')
            }
            if (item.quantity>product.stock){
                return response.redirect('/cart')
            }
            totalPrice+=product.price*item.quantity
        }

        const transaction=await Transaction.create({userId:user.id, totalPrice, paymentStatus: 'pending'})

        for (const item of cartItems){
            const product=item.product
            await TransactionItem.create({transactionId:transaction.id, productId:product.id, quantity:item.quantity, priceEach:product.price})
            product.stock-=item.quantity
            product.sold+=item.quantity
            await product.save()
        }

        await Cart.query().where('userId', user.id).delete()
        return response.redirect(`/transactions/${transaction.id}`)
    }
}