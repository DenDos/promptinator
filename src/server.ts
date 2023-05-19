import '../aliasConfig'

import bodyParser from 'body-parser'
import cors, { CorsOptions } from 'cors'
import express, { Express } from 'express'
import listEndpoints from 'express-list-endpoints'
import session, { Store } from 'express-session'
import createMemoryStore from 'memorystore'
import morgan from 'morgan'
import passport from 'passport'
import path from 'path'
import * as process from 'process'

import router from '@src/routes/index'

const app: Express = express()

// Use morgan middleware to log requests in "dev" format during development
// if (process.env.NODE_ENV === 'development') {
app.use(morgan('dev'))
// }

// Define the type of the MemoryStore constructor
interface MemoryStoreConstructor {
  new (options: { checkPeriod: number }): Store
}

// Create the MemoryStore constructor
const MemoryStore = createMemoryStore(session) as MemoryStoreConstructor
// Use express-session middleware
app.use(
  session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
    secret: `${process.env.COOKIE_SECRET}`,
    resave: false,
    saveUninitialized: false,
  })
)

// Middleware to parse JSON request bodies
app.use(express.json())

app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }))

// Initialize Passport and use it as middleware
app.use(passport.initialize())
app.use(passport.session())

const corsOptions: CorsOptions = {
  origin: 'https://chat.openai.com',
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
}
// Use the CORS middleware with the specified options
app.use(cors(corsOptions))

// Serve static files from the "public" directory
app.use(express.static(path.join(process.cwd(), 'public')))

// Define routes
app.use(router)

// View Engine Setup
app.set('views', path.join(__dirname, 'landing'))
app.set('view engine', 'ejs')

// Start the server
app.listen(3000, () => {
  console.log(process.env.NODE_ENV, '=======process.env.NODE_ENV======')
  console.log('Server is running on http://localhost:3000')
  console.log(listEndpoints(app))
})
