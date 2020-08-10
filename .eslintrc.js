module.exports = {
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 11,
  },
  rules: {
    'no-console': 0,
    'no-nested-ternary': 0,
    'import/no-cycle': 0,
    'import/names': 0,
    'import/prefer-default-export': 0,
  },
};
