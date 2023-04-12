import dotenv from 'dotenv'

dotenv.config()

const CONFIG = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
  staging: {
    pool: {
      min: 2,
      max: 10,
    },
  },

  production: {
    pool: {
      min: 2,
      max: 10,
    },
  },
}

export default CONFIG
