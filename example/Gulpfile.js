var protractor = require('gulp-protractor');
var gulp = require('gulp');
var spawn = require('child_process').spawn;

// Setting up the test task
gulp.task('protractor', function() {
    gulp.src(['example_spec.js']).pipe(protractor({
        configFile: 'protractor.conf.js'
    }));
});

// webdriver setup and run
gulp.task('webdriver', function(cb) {
    spawn('./node_modules/.bin/webdriver-manager', ['update'], { stdio: 'inherit' }).on('close', function() {
        spawn('./node_modules/.bin/webdriver-manager', ['start'], { stdio: 'inherit' }).on('close', function() {
            cb();
        });
    });
});