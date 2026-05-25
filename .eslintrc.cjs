module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
  },
  extends: ["eslint:recommended", "plugin:react-hooks/recommended"],
  ignorePatterns: ["dist", "node_modules"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
  }
};
