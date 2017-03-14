'use strict';
var es = require('event-stream');
var path = require('path');
var childProcess = require('child_process');
var PluginError = require('gulp-util').PluginError;
var winExt = /^win/.test(process.platform) ? '.cmd' : '';

// optimization: cache for protractor binaries directory
var protractorDir = null;

function getProtractorCli() {
	var result = require.resolve('protractor');
	if (result) {
		return result.replace('index', 'cli');
	} else {
		throw new Error('Please check whether protractor is installed or not.');
	}
}

function getProtractorDir() {
	if (protractorDir) {
		return protractorDir;
	}
	var result = require.resolve('protractor');
	if (result) {
		// console.log(result);
		// result is now something like
		// c:\\Source\\gulp-protractor\\node_modules\\protractor\\built\\index.js
		protractorDir = path.resolve(path.join(path.dirname(result), '..', '..', '.bin'));
		return protractorDir;
	}
	throw new Error('No protractor installation found.');
}

var protractor = function(options) {
	var files = [],
		child, args;

	options = options || {};
	args = options.args || [];

	return es.through(function(file) {
		files.push(file.path);
		this.push(file);
	}, function() {
		var stream = this;

		// Enable debug mode
		if (options.debug) {
			args.push('debug');
		}

		// Attach Files, if any
		if (files.length) {
			args.push('--specs');
			args.push(files.join(','));
		}

		// Pass in the config file
		if (options.configFile) {
			args.unshift(options.configFile);
		}

		// console.log(getProtractorCli());

		// child = childProcess.spawn(path.resolve(getProtractorDir() + '/protractor'), args, {
		child = childProcess.fork(getProtractorCli(), args, {
			stdio: 'inherit',
			env: process.env
		}).on('exit', function(code) {
			if (child) {
				child.kill();
			}
			if (stream) {
				if (code) {
					stream.emit('error', new PluginError('gulp-protractor', 'protractor exited with code ' + code));
				} else {
					stream.emit('end');
				}
			}
		});
	});
};

var wdUpdate = function(opts, cb) {
	var callback = (cb ? cb : opts);
	var options = (cb ? opts : null);
	var args = ['update', '--standalone'];
	if (options) {
		if (options.webdriverManagerArgs) {
			options.webdriverManagerArgs.forEach(function(element) {
				args.push(element);
			});
		}
		if (options.browsers) {
			options.browsers.forEach(function(element) {
				args.push('--' + element);
			});
		}
	}
	childProcess.spawn(path.resolve(getProtractorDir() + '/webdriver-manager' + winExt), args, {
		stdio: 'inherit'
	}).once('close', callback);
};

var webdriverUpdateSpecific = function(opts) {
	return wdUpdate.bind(this, opts);
};

wdUpdate.bind(null, ['ie', 'chrome']);

var webdriverStandalone = function(cb) {
	childProcess.spawn(path.resolve(getProtractorDir() + '/webdriver-manager' + winExt), ['start'], {
		stdio: 'inherit'
	}).once('close', cb);
};

module.exports = {
	getProtractorDir: getProtractorDir,
	getProtractorCli: getProtractorCli,
	protractor: protractor,
	webdriver_standalone: webdriverStandalone,
	webdriver_update: wdUpdate,
	webdriver_update_specific: webdriverUpdateSpecific
};
