import cors, { CorsOptions } from 'cors'
import express, { Express } from 'express'
import session from 'express-session'
import morgan from 'morgan'
import passport from 'passport'
import path from 'path'

import router from '@src/routes/index'

const app: Express = express()

// Use morgan middleware to log requests in "dev" format during development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Use express-session middleware
app.use(
  session({
    secret: 'some-secret-key',
    resave: false,
    saveUninitialized: false,
  })
)

// Middleware to parse JSON request bodies
app.use(express.json())

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

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
