import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { UserUpdateValidator } from '#validators/user_validator'

export default class UsersController {
    //for user profile rendering
    async show({params, view}:HttpContext){
        const user = await User.findOrFail(params.id)// note: just replace findOrFail() with find() for custom 404 otherwise leaving it like that is fine
        return view.render('pages/users/profile', {user})
    }

    //show edit form/page
    async edit({params, view}:HttpContext){
        const user=await User.findOrFail(params.id)
        return view.render('pages/users/edit', {user})
    }

    //for profile editing
    async update({params, request, response}:HttpContext){
        const user=await User.findOrFail(params.id)
        const data=await request.validateUsing(UserUpdateValidator)
        user.merge(data)
        await user.save()
        return response.redirect(`/users/${user.id}`)
    }

    //delete account
    async destroy({params, response}:HttpContext){
        const user=await User.findOrFail(params.id)
        await user.delete()
        return response.redirect('/')
    }
}