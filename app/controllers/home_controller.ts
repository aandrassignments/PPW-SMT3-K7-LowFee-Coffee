import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
    async index({view}:HttpContext){
        const featured=await Product.query().orderBy('created_at', 'desc').limit(3)
        return view.render('pages/home',{featured})
    }
}