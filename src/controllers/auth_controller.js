import express from 'express'
import session from 'express-session'
import passport from 'passport'
import Strategy from 'passport-strategy'
import path from 'path'

class CustomOAuth2Strategy extends Strategy {
  constructor() {
    super()
    this.name = 'custom-oauth2'
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  authenticate(_req, _options) {
    // Simulate the OAuth flow by generating a random user profile
    const profile = {
      id: '12345',
      displayName: 'John Doe',
      provider: 'custom-oauth2',
    }

    // In a real OAuth flow, you would redirect the user to the OAuth provider's
    // authorization URL and handle the callback with the authorization code.

    // For this example, we'll skip the OAuth flow and directly call the `success` method
    this.success(profile)
  }
}

// Use the custom OAuth strategy
passport.use(new CustomOAuth2Strategy())

// Serialize and deserialize user information for session management
passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

const app = express()

// Use express-session middleware
app.use(
  session({
    secret: 'some-secret-key',
    resave: false,
    saveUninitialized: false,
  })
)

// Initialize Passport and use it as middleware
app.use(passport.initialize())
app.use(passport.session())

// Serve static files from the "public" directory
app.use(express.static(path.join(process.cwd(), 'public')))

export const customAuth = (req, res) => {
  passport.authenticate('custom-oauth2', { successRedirect: '/profile' })(req, res)
}

export const profile = (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Hello, ${req.user.displayName}!`)
  } else {
    res.redirect('/')
  }
}

export const logout = (req, res) => {
  req.logout()
  res.redirect('/')
}
