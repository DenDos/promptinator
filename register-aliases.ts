// register-aliases.js
import moduleAlias from 'module-alias'

if (process.env.NODE_ENV === 'production') {
  // Define aliases for production
  moduleAlias.addAliases({
    '@src': __dirname + '/dist/src',
  })
} else {
  // Define aliases for local development
  moduleAlias.addAliases({
    '@src': __dirname + '/src',
  })
}
