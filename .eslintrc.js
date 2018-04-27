module.exports = {
  extends: 'standard',
  plugins: ['prettier'],
  rules: {
    semi: [2, 'always'],
    'no-extra-semi': 2,
    'prettier/prettier': 'error',
    'comma-dangle': 0,
    'space-before-function-paren': 0,
  },
  globals: {
    browser: false,
    expect: false,
    $: false,
    $$: false,
  },
  env: {
    mocha: true,
  },
};
