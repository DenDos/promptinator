// aliasConfig.js
import * as moduleAlias from 'module-alias'

if (process.env.NODE_ENV === 'production') {
  moduleAlias.addAliases({
    '@src': 'dist/src',
    '@root': 'dist',
  })
} else {
  moduleAlias.addAliases({
    '@src': 'src',
    '@root': '.',
  })
}
