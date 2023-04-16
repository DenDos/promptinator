import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('prompts', (table) => {
    table.text('value')
    table.dropColumns('prompt')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('prompts', (table) => {
    table.text('prompt')
    table.dropColumns('value')
  })
}
