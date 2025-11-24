import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class AdminDashboardController {
    async index({view}:HttpContext){
        const totalUsers = await db.from('users').count('* as total')//'*', 'total' also works. either is fine
        const usersCount=Number(totalUsers[0].total)

        const incomeResult=await db.from('transactions').sum('total_price as total')
        const totalIncome=Number(incomeResult || 0)

        const totalProducts=await db.from('products').count('*', 'total')
        const productsCount=Number(totalProducts[0].total)

        const orderStatus=await db.from('transactions').count('* as total').select('payment_status').groupBy('payment_status')

        return view.render('pages/admin/dashboard', {usersCount, totalIncome, productsCount, orderStatus})
    }
    
}