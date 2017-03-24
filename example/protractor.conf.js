// An example configuration file.
// https://raw.github.com/angular/protractor/master/example/conf.js
exports.config = {

	directConnect: true,

	// The address of a running selenium server.
	// Make sure you check the version in the folder
	// seleniumServerJar: './selenium-server-standalone-3.2.0.jar',

	// webdriver-start can start on default port 4444
	//seleniumAddress: 'http://localhost:4444/wd/hub',

	// Capabilities to be passed to the webdriver instance.
	capabilities: {
		'browserName': 'chrome'
	},

	specs: ['example-spec.js'],

	allScriptsTimeout: 60000,

	// Options to be passed to Jasmine-node.
	jasmineNodeOpts: {
		showColors: true,
		defaultTimeoutInterval: 30000
	}
};
