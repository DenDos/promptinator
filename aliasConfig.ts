// aliasConfig.js
import * as moduleAlias from 'module-alias'

if (process.env.NODE_ENV === 'production') {
  moduleAlias.addAliases({
    '@src': __dirname + '/src',
    '@root': __dirname,
  })
} else {
  moduleAlias.addAliases({
    '@src': 'src',
    '@root': '.',
  })
}
