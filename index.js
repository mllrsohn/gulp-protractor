var es = require('event-stream');
var fs = require('fs');
var path = require('path');
var child_process = require('child_process');
var async = require('async');
var PluginError = require('gulp-util').PluginError;
var winExt = /^win/.test(process.platform)?'.cmd':'';

// optimization: cache for protractor binaries directory
var binDir = null;

function getBinDir() {
  if (binDir) return binDir;
  var result = require.resolve('protractor');
  if (result) {
    // result is now something like
    // c:\\Source\\gulp-protractor\\node_modules\\protractor\\lib\\protractor.js
    return path.resolve(path.join(path.dirname(result), '..', '..', '.bin'));
  }
  throw new Error('No protractor installation found.');
}

function protractor(options) {
  var files = [],
      args;

  options = options || {};
  args = options.args || [];

  function write(file) {
    files.push(file.path);
    this.push(file);
  }

  function end() {
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

    if (options.autoStartStop) {
      webdriver_update(null, function() {
        args.push('--seleniumServerJar', getSeleniumJarPath());
        spawnProtractor(args, stream);
      });
    } else {
      spawnProtractor(args, stream);
    }
  }
  return es.through(write, end);
};

function spawnProtractor(args, stream) {
  var child = child_process.spawn(path.resolve(getBinDir() + '/protractor'+winExt), args, {
    stdio: 'inherit',
    env: process.env
  }).on('exit', function(code) {
    if (child) child.kill();
    if (stream) {
      if (code) {
        stream.emit('error', new PluginError('gulp-protractor', 'protractor exited with code ' + code));
      }
      else {
        stream.emit('end');
      }
    }
  });
}

function webdriver_update(opts, cb) {
  var callback = (cb ? cb : opts);
  var options = (cb ? opts : null);
  var args = ['update', '--standalone'];
  if (options) {
    if (options.browsers) {
      options.browsers.forEach(function(element, index, array) {
        args.push('--' + element);
      });
    }
  }
  child_process.spawn(path.resolve(getBinDir() + '/webdriver-manager'+winExt), args, {
    stdio: 'inherit'
  }).once('close', callback);
};

function webdriver_update_specific(opts) {
  return webdriver_update.bind(this, opts);
};

webdriver_update.bind(null, ['ie', 'chrome'])

function webdriver_standalone(cb) {
  var webdriverManager = child_process.spawn(path.resolve(getBinDir() + '/webdriver-manager'+winExt), ['start'], {
    stdio: 'inherit'
  });
  webdriverManager.once('close', cb);
  return webdriverManager;
};

function getSeleniumJarPath() {
  var seleniumDir = path.resolve(path.join(getBinDir(), '..', 'protractor', 'selenium'));
  var files = fs.readdirSync(seleniumDir)
  var seleniumJar = files.find(function(file) {
    return file.match(/^selenium-server.*\.jar$/);
  });
  return path.join(seleniumDir, seleniumJar);
}

module.exports = {
  getProtractorDir: getBinDir,
  protractor: protractor,
  webdriver_standalone: webdriver_standalone,
  webdriver_update: webdriver_update,
  webdriver_update_specific: webdriver_update_specific
};
