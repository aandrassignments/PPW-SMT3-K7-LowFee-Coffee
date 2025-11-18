import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Product from './product.js'
import User from './user.js'

export default class Cart extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({columnName:'user_id'})
  declare userId:number

  @column({columnName:'product_id'})
  declare productId:number

  @column()
  declare quantity:number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(()=>User,{
    foreignKey:'userId',
    localKey:'id'
  })
  declare user: BelongsTo<typeof User>

  @belongsTo(()=>Product,{
    foreignKey:'productId',
    localKey:'id'
  })
  declare product: BelongsTo<typeof Product>

}