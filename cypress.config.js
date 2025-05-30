const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: "dc7qkx",
  e2e: {
    baseUrl: "https://api.trello.com/1"
  },
})