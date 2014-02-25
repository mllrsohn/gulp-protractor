var gulp = require('gulp');

// The protractor task
var protractor = require('../').protractor;

// Start a standalone server
var webdriver_standalone = require('../').webdriver_standalone;

// Download and update the selenium driver
var webdriver_update = require('../').webdriver_update;

// Downloads the selenium webdriver
gulp.task('webdriver_update', webdriver_update);

// Start the standalone selenium server
// NOTE: This is not needed if you reference the
// seleniumServerJar in your protractor.conf.js
gulp.task('webdriver_standalone', webdriver_standalone);


// Setting up the test task
gulp.task('protractor', ['webdriver_update'], function() {
    gulp.src(['example_spec.js']).pipe(protractor({
        configFile: 'protractor.conf.js',
    })).on('error', function(e) { throw e });
});
