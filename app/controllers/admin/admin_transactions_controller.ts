import Transaction from '#models/transaction'
import type { HttpContext } from '@adonisjs/core/http'

export default class AdminTransactionsController {
    async index({view}:HttpContext){
        const transactions = await Transaction.query().preload('user').preload('items', itemQuery=>{itemQuery.preload('product')}).orderBy('created_at', 'desc')
        return view.render('pages/admin/transactions/index', {transactions})
    }

    async show({view, params}:HttpContext){
        const transaction = await Transaction.query().where('id', params.id).preload('user').preload('items', q=>q.preload('product')).firstOrFail()
        return view.render('pages/admin/transactions/show', {transaction})
    }

    async update({request, params, response}:HttpContext){
        const transaction = await Transaction.findOrFail(params.id)
        transaction.paymentStatus=request.input('paymentStatus')
        await transaction.save()
        return response.redirect().back()
    }
}