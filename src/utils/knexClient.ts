import knex, { Knex } from 'knex'

import knexfile from '@root/knexfile'

const knexConfig: Knex.Config = knexfile

// Create a Knex client using the configuration
const knexClient: Knex = knex(knexConfig)

// Attach an event listener to the "query" event
knexClient.on('query', (query) => {
  const currentTime = new Date().toISOString().replace('T', ' ').split('.')[0]
  // Log the SQL query and bindings
  console.log(`======${currentTime}: SQL Query======`, query.sql)
  console.log(`======${currentTime}: Bindings======`, query.bindings)
})

export default knexClient
