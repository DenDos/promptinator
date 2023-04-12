import knex, { Knex } from 'knex'
import knexfile from '@root/knexfile'

const knexConfig: Knex.Config = knexfile

// Create a Knex client using the configuration
const knexClient: Knex = knex(knexConfig)

// Attach an event listener to the "query" event
knexClient.on('query', (query) => {
  // Log the SQL query and bindings
  console.log('======SQL Query======', query.sql)
  console.log('======Bindings======', query.bindings)
})

export default knexClient
