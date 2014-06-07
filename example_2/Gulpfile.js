'use strict';

var gulp = require('gulp');
require('gulp-help')(gulp);
var gp = require('gulp-protractor');
var args = require('yargs').argv;
var express = require('express');
var http = require('http');
var server = http.createServer(express().use(express.static(__dirname + '/build/')));
var isCI = args.type === 'ci';

// Download and update the selenium driver
gulp.task('e2etests:webdriver_manager_update', 'updates the selenium server standalone jar file ', gp.webdriver_update);

gulp.task('e2etests:run', 'runs e2etests using protractor.conf', ['e2etests:server'], function(cb) {

	gulp.src(['tests/e2e/**/*.js'], { read:false })
		.pipe(gp.protractor({
			configFile: './protractor.conf.js',
			args: ['--baseUrl', 'http://' + server.address().address + ':' + server.address().port]
		})).on('error', function(e) {
			server.close();
			if(isCI) {
				throw e;
			} else {
				console.log(e);
			}
			cb();
		}).on('end', function() {
			server.close();
			cb();
		});
});

gulp.task('e2etests:server', 'starts a development webserver', function(cb) {
	server.listen(9001, cb);
});
