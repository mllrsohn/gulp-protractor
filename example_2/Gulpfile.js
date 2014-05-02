'use strict';

var gulp = require('gulp');
require('gulp-help')(gulp);
var express = require('express');
var gp = require('gulp-protractor');
var args = require('yargs').argv;
var server, isCI = args.type === 'ci';

// Download and update the selenium driver
gulp.task('e2etests:webdriver_manager_update', 'updates the selenium server standalone jar file ', gp.webdriver_update);
gulp.task('e2etests:run', 'runs e2etests using protractor.conf', ['e2etests:server'], function(cb) {

	gulp.src(['tests/e2e/**/*.js'], { read:false })
		.pipe(gp.protractor({
			configFile: './protractor.conf.js'
		})).on('error', function(e) {
			if(isCI) {
				throw e;
			} else {
				console.log(e);
			}
			cb();
		}).on('end', function() {
			// Close the Server
			if (server) {
				server.close();
			}
			// Gulp Callback
			cb();

		});
});

gulp.task('e2etests:server', 'starts a development webserver', function(cb) {
	var app = express();
	app.use(express.static(__dirname + '/build/'));
	server = app.listen(9001, cb);
});