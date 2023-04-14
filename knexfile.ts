import dotenv from 'dotenv'

dotenv.config()

const CONFIG = {
  client: 'pg',
  connection: {
    // Specify your database connection details here
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'promptinator',
  },
  migrations: {
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
  pool: {
    min: 2,
    max: 10,
  },
}

export default CONFIG
