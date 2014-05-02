exports.config = {
  //seleniumAddress: 'http://localhost:4444/wd/hub',

  seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-2.41.0.jar',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['tests/e2e/**/*.js'],

  baseUrl: 'http://localhost:9000',

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};