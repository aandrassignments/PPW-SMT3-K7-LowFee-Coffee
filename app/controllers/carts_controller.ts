import Product from '#models/product'
import Cart from '#models/cart'
import type { HttpContext } from '@adonisjs/core/http'
import { CartStoreValidator, CartUpdateValidator } from '#validators/cart_validator'

export default class CartsController {

    async index({view, auth}:HttpContext){
        const user=auth.user!
        const cartItems=await Cart.query().where('userId', user.id).preload('product')
        const total=cartItems.reduce((sum,item)=>sum+(item.product.price * item.quantity),0)
        return view.render('pages/cart', {cartItems, total})
    }

    async store({request, response, auth, session}:HttpContext){
        const user=auth.user!
        const data = await request.validateUsing(CartStoreValidator)
        const product=await Product.findOrFail(data.productId)

        if (data.quantity>product.stock){
            session.flash({notification:{type:'error', message:'Not enough stock'}})
            return response.redirect().back()
        }

        const existingCartItem=await Cart.query().where('userId', user.id).where('productId', data.productId).first()

        if (existingCartItem){
            const newQuantity=existingCartItem.quantity+data.quantity

            if (newQuantity>product.stock){
                session.flash({notification:{type:'error', message:'Cannot add more than available stock'}})
                return response.redirect().back()
            }

            existingCartItem.quantity=newQuantity
            await existingCartItem.save()
            session.flash({notification:{type:'success', message:'Quantity updated'}})
            return response.redirect().back()
        }

        await Cart.create({userId:user.id, productId:data.productId, quantity:data.quantity})
        session.flash({notification:{type:'success', message:'Added to cart'}})
        return response.redirect().back()
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

    async destroy({params, response, auth}:HttpContext){
        const user=auth.user!
        const cartItem=await Cart.findOrFail(params.id)
        if (cartItem.userId !== user.id){
            return response.unauthorized('Not Allowed')
        }
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