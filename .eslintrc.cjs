module.exports = {
  env: {
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser for TypeScript
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module', // Allows for the use of imports
  },
  rules: {
    // Additional ESLint rules can be added here
    'prettier/prettier': 'error', // Enables Prettier rules and sets them to error level
  },
}
