'use strict';

var gulp = require('gulp');

require('gulp-help')(gulp);

var express = require("express");
var gp = require('gulp-protractor');
var server;

// Download and update the selenium driver
gulp.task('e2etests:webdriver_manager_update', 'updates the selenium server standalone jar file ', gp.webdriver_update);

var protractor_function = function(config_name){

  // load protractor config
  var protractor_config = require(config_name).config;

  return gulp.src(protractor_config.specs)
    .pipe(gp.protractor({
      configFile: config_name
    }))
    .on('error', function(e) { throw e })
    .on('end', function(){
      if(server) {
        server.close();
      }
  })
}

gulp.task('e2etests', 'runs e2etests using protractor.conf', ['server'], function(){
  return protractor_function('./protractor.conf.js')
});

gulp.task('server', 'starts a development webserver', function() {
  var app = express();
  app.use(express.static(__dirname + "/build/"));
  console.log('server runs on port 9000')
  server = app.listen(9000);
});
