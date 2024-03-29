/* eslint-env node */

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}",
    baseUrl: "http://localhost:4173",
  },
  component: {
    specPattern: "cypress/component/**/*.{cy,spec}.{js,jsx,ts,tsx}",
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
});
