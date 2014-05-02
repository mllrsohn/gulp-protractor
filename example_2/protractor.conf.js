exports.config = {
  //seleniumAddress: 'http://localhost:4444/wd/hub',

  seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-2.41.0.jar',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:9001',

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};