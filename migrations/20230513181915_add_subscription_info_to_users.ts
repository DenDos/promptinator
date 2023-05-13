import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('users', (table) => {
    table.datetime('subscription_active_until')
    table.string('subscription_status')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('users', (table) => {
    table.dropColumns('subscription_active_until', 'subscription_status')
  })
}
