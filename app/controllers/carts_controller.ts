import Product from '#models/product'
import Cart from '#models/cart'
import type { HttpContext } from '@adonisjs/core/http'
import { CartStoreValidator, CartUpdateValidator } from '#validators/cart_validator'

export default class CartsController {

    async index({view}:HttpContext){
        const userId=1 //change this once auth is working
        const cartItems=await Cart.query().where('userId', userId).preload('product')
        const total=cartItems.reduce((sum,item)=>sum+(item.product.price * item.quantity),0)
        return view.render('pages/cart', {cartItems, total})
    }

    async store({request, response}:HttpContext){
        const data = await request.validateUsing(CartStoreValidator)
        const userId=1
        const product=await Product.findOrFail(data.productId)

        if (data.quantity>product.stock){
            return response.redirect('/cart')
        }

        const existingCartItem=await Cart.query().where('userId', userId).where('productId', data.productId).first()

        if (existingCartItem){
            const newQuantity=existingCartItem.quantity+data.quantity

            if (newQuantity>product.stock){
                return response.redirect('/cart')
            }

            existingCartItem.quantity=newQuantity
            await existingCartItem.save()
            return response.redirect('/cart')
        }

        await Cart.create({userId, productId:data.productId, quantity:data.quantity})
    }

    async update({params, request, response}:HttpContext){
        const data=await request.validateUsing(CartUpdateValidator)
        const cart=await Cart.findOrFail(params.id)
        const product=await Product.findOrFail(cart.productId)

        if (data.quantity>product.stock){
            return response.redirect('/cart')
        }
        cart.quantity=data.quantity
        await cart.save()
        return response.redirect('/cart')
    }

    async destroy({params, response}:HttpContext){
        const cartItem=await Cart.findOrFail(params.id)
        await cartItem.delete()
        return response.redirect('/cart')
    }

    async clear({response, auth}:HttpContext){
        const user=auth.user
        if(!user){
            return response.redirect('/cart')
        }
        await Cart.query().where('userId', user.id).delete()
        return response.redirect('/cart')   
    }
}