var es = require('event-stream');
var path = require('path');
var child_process = require('child_process');
var async = require('async');
var PluginError = require('gulp-util').PluginError;
var winExt = /^win/.test(process.platform)?".cmd":"";

var protractor = function(options) {
	var files = [],
		child, args;

	options = options || {};
	args = options.args || [];

	if (!options.configFile) {
		this.emit('error', new PluginError('gulp-protractor', 'Please specify the protractor config file'));
	}
	return es.through(function(file) {
		files.push(file.path);
	}, function() {
		var stream = this;

		// Attach Files, if any
		if (files.length) {
			args.push('--specs');
			args.push(files.join(','));
		}

		// Pass in the config file
		args.unshift(options.configFile);

		child = child_process.spawn(path.resolve('./node_modules/.bin/protractor'+winExt), args, {
			stdio: 'inherit'
		}).on('exit', function(code) {
			if (child) {
				child.kill();
			}
			if (stream) {
				if (code) {
					stream.emit('error', new PluginError('gulp-protractor', 'protractor exited with code ' + code));
				}
				else {
					stream.emit('end');
				}
			}
		});
	});
};

var webdriver_update = function(cb) {
	child_process.spawn(path.resolve('./node_modules/.bin/webdriver-manager'+winExt), ['update'], {
		stdio: 'inherit'
	}).once('close', cb);
};

var webdriver_standalone = function(cb) {
	var child = child_process.spawn(path.resolve('./node_modules/.bin/webdriver-manager'+winExt), ['start'], {
		stdio: 'inherit'
	}).once('close', cb);
};

module.exports = {
	protractor: protractor,
	webdriver_standalone: webdriver_standalone,
	webdriver_update: webdriver_update
};
