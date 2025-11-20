import type { HttpContext } from '@adonisjs/core/http'
import { UserUpdateValidator } from '#validators/user_validator'

export default class UsersController {
    //for user profile rendering
    async show({auth, view}:HttpContext){
        const user = auth.user!
        return view.render('pages/users/profile', {user})
    }

    //show edit form/page
    async edit({auth, view}:HttpContext){
        const user=auth.user!
        return view.render('pages/users/edit', {user})
    }

    //for profile editing
    async update({auth, request, response}:HttpContext){
        const user=auth.user!
        const data=await request.validateUsing(UserUpdateValidator)
        user.merge(data)
        await user.save()
        return response.redirect(`/users`)
    }

    //delete account
    async destroy({auth, response}:HttpContext){
        const user=auth.user!
        await user.delete()
        return response.redirect('/')
    }
}