// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tsConfig = require('./tsconfig.json')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tsConfigPaths = require('tsconfig-paths')

const baseUrl = tsConfig.compilerOptions.baseUrl || '.'
const outDir = tsConfig.compilerOptions.outDir || '.'

const env = process.env.ENV

let baseUrlPath
if (env === 'Production' || env === 'Staging') {
  baseUrlPath = path.resolve(outDir, baseUrl)
} else {
  baseUrlPath = baseUrl
}

const explicitParams = {
  baseUrl: baseUrlPath,
  paths: tsConfig.compilerOptions.paths,
}
tsConfigPaths.register(explicitParams)
