module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here
  rules: {
    "no-console": "off",
    "eqeqeq": "off",
    "no-unexpected-multiline": "off",
    "no-param-reassign": "off",
    "import/no-extraneous-dependencies": "off",
    "prettier/prettier": "error"
  }
}
