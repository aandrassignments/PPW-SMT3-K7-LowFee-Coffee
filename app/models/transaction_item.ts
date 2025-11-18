import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Transaction from './transaction.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Product from './product.js'

export default class TransactionItem extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare transactionId:number

  @column()
  declare productId:number

  @column()
  declare quantity:number

  @column()
  declare priceEach:number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(()=>Transaction,{
    foreignKey:'transactionId',
    localKey:'id'
  })
  declare transaction: BelongsTo<typeof Transaction>

  @belongsTo(()=>Product,{
    foreignKey:'productId',
    localKey:'id'
  })
  declare product: BelongsTo<typeof Product>
}