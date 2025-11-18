import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import TransactionItem from './transaction_item.js'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare totalPrice: number

  @column()
  declare paymentStatus: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(()=>User,{
    foreignKey:'userId',
    localKey:'id'
  })
  declare user: BelongsTo<typeof User>

  @hasMany(()=>TransactionItem,{
    foreignKey:'transactionId'
  })
  declare items: HasMany <typeof TransactionItem>
}