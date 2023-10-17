const { defineConfig } = require("cypress");

module.exports = defineConfig({

  defaultCommandTimeout: 6000,
  
  "reporter": "cypress-mochawesome-reporter", //for html reports
 

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      this.screenshotOnRunFailure=true;
      require('cypress-mochawesome-reporter/plugin')(on); //for html reports
    },
    "video": true,
    specPattern:'cypress/e2e/*.js'
  },
  
});
