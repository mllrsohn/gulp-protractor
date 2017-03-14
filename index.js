var es = require('event-stream');
var fs = require('fs');
var path = require('path');
var child_process = require('child_process');
var async = require('async');
var PluginError = require('gulp-util').PluginError;
var winExt = /^win/.test(process.platform)?".cmd":"";
var env = process.env;

// optimization: cache for protractor binaries directory
var protractorDir = null;

function getProtractorDir() {

  if (protractorDir) {
    return protractorDir;
  }
  
  // Use environment variable PROTRACTOR_DIR
  // when user needs to use a specific protractor install.
  if (env.PROTRACTOR_DIR) {
    protractorDir = env.PROTRACTOR_DIR;
    return protractorDir;
  }

  var result = require.resolve("protractor");
  if (result) {
    // result is now something like
    // c:\\Source\\gulp-protractor\\node_modules\\protractor\\lib\\protractor.js
    protractorDir = path.resolve(path.join(path.dirname(result), "..", "..", ".bin"));
    return protractorDir;
  }
  throw new Error("No protractor installation found.");
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

    child = child_process.spawn(path.resolve(getProtractorDir() + '/protractor'+winExt), args, {
      stdio: 'inherit',
      env: process.env
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

var webdriver_update = function(opts, cb) {
  var callback = (cb ? cb : opts);
  var options = (cb ? opts : null);
  var args = ["update", "--standalone"];
  if (options) {
	if (options.webdriverManagerArgs) {
		options.webdriverManagerArgs.forEach(function(element) {
			args.push(element);
		});
	}
    if (options.browsers) {
      options.browsers.forEach(function(element, index, array) {
        args.push("--" + element);
      });
    }
  }
  child_process.spawn(path.resolve(getProtractorDir() + '/webdriver-manager'+winExt), args, {
    stdio: 'inherit'
  }).once('close', callback);
};

var webdriver_update_specific = function(opts) {
  return webdriver_update.bind(this, opts);
};

webdriver_update.bind(null, ["ie", "chrome"])

var webdriver_standalone = function(cb) {
  var child = child_process.spawn(path.resolve(getProtractorDir() + '/webdriver-manager'+winExt), ['start'], {
    stdio: 'inherit'
  }).once('close', cb);
};

module.exports = {
  getProtractorDir: getProtractorDir,
  protractor: protractor,
  webdriver_standalone: webdriver_standalone,
  webdriver_update: webdriver_update,
  webdriver_update_specific: webdriver_update_specific
};
