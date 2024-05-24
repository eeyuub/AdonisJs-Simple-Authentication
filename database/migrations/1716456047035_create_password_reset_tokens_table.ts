import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'password_reset_tokens'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('token').unique().notNullable()
      table.integer('user_id').unsigned().index().defaultTo(3)
      table.foreign('user_id').references('users.id')
      table.timestamp('expires_at')
      table.timestamp('created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
