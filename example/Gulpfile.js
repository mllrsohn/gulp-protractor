var gulp = require('gulp');

var protractor = require('../').protractor;
var webdriver = require('../').webdriver;

// var protractor = require('gulp-protractor').protractor;
// var webdriver = require('gulp-protractor').webdriver;


// Setting up the webdriver
gulp.task('webdriver', webdriver);

// Setting up the test task
gulp.task('protractor', ['webdriver'], function() {
    gulp.src(['example_spec.js']).pipe(protractor({
        configFile: 'protractor.conf.js'
    }));
});

