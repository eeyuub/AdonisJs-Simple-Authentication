import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('role_id').unsigned().index().defaultTo(3)
      table.foreign('role_id').references('roles.id')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
