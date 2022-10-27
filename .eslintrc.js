const RULES = {
  OFF: "off",
  WARN: "warn",
  ERROR: "error",
}

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:react/recommended", "standard-with-typescript", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaFeaures: {
      tsx: true,
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["react"],
  rules: {
    "@typescript-eslint/no-unused-vars": RULES.WARN,
    "@typescript-eslint/strict-boolean-expressions": RULES.OFF,
    "react/react-in-jsx-scope": RULES.WARN,
    "@typescript-eslint/explicit-function-return-type": RULES.OFF,
    "@typescript-eslint/promise-function-async": RULES.OFF,
    "@typescript-eslint/restrict-template-expressions": RULES.OFF,
    "@typescript-eslint/restrict-plus-operands": RULES.OFF,
  },
}
