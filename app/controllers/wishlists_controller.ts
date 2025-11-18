import Product from '#models/product'
import Wishlist from '#models/wishlist'
import { WishlistStoreValidator } from '#validators/wishlist_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class WishlistsController {
    async index({view}:HttpContext){
        const userId=1
        const wishlists=await Wishlist.query().where('userId', userId).preload('product')
        return view.render('pages/wishlist', {wishlists})
    }

    async store({request, response}: HttpContext){
        const data =await request.validateUsing(WishlistStoreValidator)
        const userId=1
        await Product.findOrFail(data.productId)
        await Wishlist.firstOrCreate({userId, productId:data.productId})
        return response.redirect('/wishlists')
    }

    async destroy({params, response}:HttpContext){
        const item=await Wishlist.findOrFail(params.id)
        await item.delete()
        return response.redirect('/wishlists')
    }
}