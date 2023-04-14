// register-aliases.ts
import moduleAlias from 'module-alias'

if (process.env.NODE_ENV === 'production') {
  // Define aliases for production
  moduleAlias.addAliases({
    '@src': 'dist/src',
    '@root': './dist',
  })
} else {
  // Define aliases for local development
  moduleAlias.addAliases({
    '@src': './src',
    '@root': './',
  })
}
