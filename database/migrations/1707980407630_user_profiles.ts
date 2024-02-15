import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'user_profiles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').primary()
      table.bigint('user_id').unsigned().references('id').inTable('user').onDelete('CASCADE')
      table.string('name').nullable()
      table.string('mobile').notNullable().unique()
      table.enum('gender', ['male', 'female']).nullable()
      table.dateTime('dob').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
