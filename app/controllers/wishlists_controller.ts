import Product from '#models/product'
import Wishlist from '#models/wishlist'
import { WishlistStoreValidator } from '#validators/wishlist_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class WishlistsController {
    async index({view, auth}:HttpContext){
        const user=auth.user!
        const wishlists=await Wishlist.query().where('userId', user.id).preload('product')
        return view.render('pages/wishlist', {wishlists})
    }

    async store({request, response, auth}: HttpContext){
        const data =await request.validateUsing(WishlistStoreValidator)
        const user=auth.user!
        await Product.findOrFail(data.productId)
        await Wishlist.firstOrCreate({userId:user.id, productId:data.productId})
        return response.redirect('/wishlist')
    }

    async destroy({params, response, auth}:HttpContext){
        const user=auth.user!
        const item=await Wishlist.findOrFail(params.id)
        if (item.userId !== user.id){
            return response.unauthorized('Not Allowed')
        }
        await item.delete()
        return response.redirect('/wishlist')
    }
}