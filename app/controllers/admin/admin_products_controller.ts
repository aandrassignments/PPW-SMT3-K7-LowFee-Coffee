import type { HttpContext } from '@adonisjs/core/http'
import Product from "#models/product";
import { AdminCreateProductValidator, AdminUpdateProductValidator } from '#validators/admin_product_validator';

export default class AdminProductsController{
    async index({view}:HttpContext){
        const products=await Product.all()
        return view.render('pages/admin/products/index', {products})
    }

    async create({view}:HttpContext){
        const products=await Product.all()
        return view.render('pages/admin/products/create', {products})
    }

    async store({request,response}:HttpContext){
        const data = await request.validateUsing(AdminCreateProductValidator)
        // const data = request.only(['name', 'description', 'price', 'stock', 'imageUrl'])
        await Product.create(data)
        return response.redirect('/admin/products')
    }

    async edit({params, view}:HttpContext){
        const product = await Product.findOrFail(params.id)
        return view.render('pages/admin/products/edit', {product})
    }

    async update({params, request, response}:HttpContext){
        const data = await request.validateUsing(AdminUpdateProductValidator)
        const product=await Product.findOrFail(params.id)
        // const data = request.only(['name', 'description', 'price', 'stock', 'imageUrl'])
        product.merge(data)
        await product.save()
        return response.redirect('/admin/products')
    }

    async destroy({params, response}:HttpContext){
        const product=await Product.findOrFail(params.id)
        await product.delete()
        return response.redirect('/admin/products')
    }
}