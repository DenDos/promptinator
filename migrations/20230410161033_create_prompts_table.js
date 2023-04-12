exports.up = function (knex) {
  return knex.schema.createTable('prompts', (table) => {
    table.increments('id').primary()
    table.text('prompt').notNullable()
    table.string('name').notNullable()
    table.integer('user_id').references('id').inTable('users')
    table.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('prompts')
}
