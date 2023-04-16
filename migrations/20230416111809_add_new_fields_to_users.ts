import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('users', (table) => {
    table.string('email').unique()
    table.string('avatar')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('users', (table) => {
    table.dropColumns('email', 'avatar')
  })
}
