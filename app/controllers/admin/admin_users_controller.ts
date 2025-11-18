import User from '#models/user'
import { adminUpdateUserValidator } from '#validators/admin_user_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class AdminUserController{
    async index({view}:HttpContext){
        const user = await User.all()
        return view.render('admin/users/index', {user})
    }

    async show({params, view}:HttpContext){
        const user = await User.findOrFail(params.id)
        return view.render('admin/users/show',{user})
    }

    async edit({params,view}:HttpContext){
        const user = await User.findOrFail(params.id)
        return view.render('admin/users/edit', {user})
    }

    async update ({params, request, response}:HttpContext){
        const data = await request.validateUsing(adminUpdateUserValidator)
        const user = await User.findOrFail(params.id)
        // const data = request.only(['fullName', 'email', 'role'])
        user.merge(data)
        await user.save()
        return response.redirect()
    }

    async destroy({params, response}:HttpContext){
        const user = await User.findOrFail(params.id)
        await user.delete()
        return response.redirect()
    }
}