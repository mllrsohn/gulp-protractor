exports.config = {
	//seleniumAddress: 'http://localhost:4444/wd/hub',

	// seleniumServerJar: '../node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.2.0.jar',

	// Capabilities to be passed to the webdriver instance.
	multiCapabilities: [
		{
			'browserName': 'chrome',
			'maxInstances': 2,
			shardTestFiles: true
		}
	],

	allScriptsTimeout: 60000,

	specs: ['./tests/e2e/**/*.js'],

	// Options to be passed to Jasmine-node.
	jasmineNodeOpts: {
		showColors: true,
		defaultTimeoutInterval: 30000
	}
};

