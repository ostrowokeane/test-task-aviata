module.exports = {
  root: true,
  env: {
    node: true,
  },
  // extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/prettier"],
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    // parser: "babel-eslint",
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/valid-v-for": "off",
    "vue/require-v-for-key": "off",
    "vue/multi-word-component-names": "off",
  },
};
