const { defineConfig } = require('cypress')
const fs = require('fs')

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
  e2e: {
    experimentalSessionAndOrigin: true,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      on('task', {
        readFileWhichMayExist(filename) {
          if (fs.existsSync(filename)) {
            return fs.readFileSync(filename, 'utf8')
          }

          return null
        },
      })
    },
  },
  env : {
    URL : './cypress/resources/task.html'
  },
  chromeWebSecurity: false
})