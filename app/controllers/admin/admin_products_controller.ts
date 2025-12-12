import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import Product from "#models/product";
import { AdminCreateProductValidator, AdminUpdateProductValidator } from '#validators/admin_product_validator';
import { cuid } from '@adonisjs/core/helpers';

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
        const {image, ...tempProduct} = data
        if (image){
            await image.move(app.makePath('storage/uploads'),{name:`${cuid()}.${image.extname}`});
            (tempProduct as any).imageUrl = `/storage/uploads/${image.fileName}`
        }
        await Product.create(tempProduct)
        return response.redirect('/admin/products')
    }

    async edit({params, view}:HttpContext){
        const product = await Product.findOrFail(params.id)
        return view.render('pages/admin/products/edit', {product})
    }

    async update({params, request, response}:HttpContext){
        const data = await request.validateUsing(AdminUpdateProductValidator)
        const {image, ...tempProduct} = data
        const product=await Product.findOrFail(params.id)
        if (image){
            const fileName = `${cuid()}.${image.extname}`
            await image.move(app.makePath(`storage/uploads`), {name:fileName}) 
            product.imageUrl=`/storage/uploads/${fileName}`
        }
        product.merge(tempProduct)
        await product.save()
        return response.redirect('/admin/products')
    }

    async destroy({params, response}:HttpContext){
        const product=await Product.findOrFail(params.id)
        await product.delete()
        return response.redirect('/admin/products')
    }
}