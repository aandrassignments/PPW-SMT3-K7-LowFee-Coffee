import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.text('description').nullable()
      table.string('category').nullable()
      table.decimal('price',10,2).notNullable()// note: 10,2 for max decimal and max number after decimal point
      table.integer('stock').defaultTo(0)
      table.integer('sold').defaultTo(0).nullable()
      table.string('image_url').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}