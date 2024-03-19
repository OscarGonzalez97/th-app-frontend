module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react/jsx-no-target-blank": "off",
    indent: ["error", 2],
    "no-trailing-spaces": "error",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/jsx-indent": ["error", 2],
    "react/jsx-indent-props": ["error", 2],
    "no-trailing-spaces": "error",
    "react/jsx-max-props-per-line": ["error", { maximum: 1 }],
    "react/jsx-closing-bracket-location": [
      "error",
      { nonEmpty: "after-props", selfClosing: "after-props" },
    ],
    "react/jsx-closing-tag-location": [
      "error",
      { nonEmpty: "after-props", selfClosing: "after-props" },
    ],
  },
};
