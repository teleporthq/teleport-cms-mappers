module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:@typescript-eslint/recommended",
    "eslint-config-prettier",
  ],
  env: {
    browser: true,
    node: true
  },
  plugins: ['prettier'],
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".ts"],
      },
    },
  },
};
