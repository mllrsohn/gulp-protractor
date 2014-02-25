// An example configuration file.
// https://raw.github.com/angular/protractor/master/example/conf.js
exports.config = {
  // The address of a running selenium server.
  seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-2.39.0.jar',
  //seleniumAddress: 'http://localhost:4444/wd/hub',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};