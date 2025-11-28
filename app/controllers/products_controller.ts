import type { HttpContext } from '@adonisjs/core/http'
import Product from "#models/product";
import db from '@adonisjs/lucid/services/db';

export default class ProductsController {

    async index({view}:HttpContext){
        // const mostPicked=await Product.query().orderBy('')
        const newest=await Product.query().orderBy('created_at', 'desc').limit(3)
        const allProducts=await Product.all()
        return view.render('pages/products',{newest, allProducts})
    }

    async show({params, view}:HttpContext){
        const product=await Product.findOrFail(params.id)
        return view.render('pages/details', {product})
    }

    async search({request, response}:HttpContext){
        const searchInput= (request.input('searchInput')||'').toLowerCase()
        if(!searchInput){
            return response.json({data:[]})
        }
        const results=await db.from('products').whereRaw('LOWER(name) LIKE ?', [`%${searchInput}%`]).select(['id', 'name'])
        return response.json({data:results})
    }

    //for seeding purposes, we can change later to use adonis seeding but this'll be sufficient
    async seed(){
        await Product.createMany([
            {
                name:`Choco Latte`,
                description:`Something Something Yap Yap`,
                price:3.99,
                stock:12,
                imageUrl:'/images/caramel.jpg',
            },
            {
                name:'Caramel Cold Brew',
                description:'Something Something Yap Yap',
                price:3.99,
                stock:20,
                imageUrl:'/images/caramel.jpg',
            },
            {
                name:'Matcha Latte',
                description:'Something Something Yap Yap',
                price:3.99,
                stock:15,
                imageUrl:'/images/matchalatte.jpg'
            }
            
        ])
        return `sample products added`
    }

}