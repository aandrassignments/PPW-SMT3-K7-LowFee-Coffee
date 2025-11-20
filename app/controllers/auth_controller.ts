import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { RegisterValidator } from '#validators/register_validator'
import { LoginValidator } from '#validators/login_validator'

export default class AuthController {
    async showRegister({view}:HttpContext){
        return view.render('pages/users/register')
    }

    async register({request, auth, response}:HttpContext){
        const data = await request.validateUsing(RegisterValidator)
        const user = await User.create(data)
        await auth.use('web').login(user)
        return response.redirect('/')
    }

    async showLogin({view}:HttpContext){
        return view.render('pages/login')
    }

    async login({request, auth, response}:HttpContext){
        const {email,password} = await request.validateUsing(LoginValidator)
        const user = await User.verifyCredentials(email, password)
        await auth.use('web').login(user)
        return response.redirect('/')
    }

    async logout({auth, response}:HttpContext){
        await auth.use('web').logout()
        return response.redirect('/')
    }
}