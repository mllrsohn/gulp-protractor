# gulp-protractor [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]

> Run your [angular protractor](https://github.com/angular/protractor) tests with [gulp](https://github.com/wearefractal/gulp)

## Usage

First, install `gulp-protractor` as a development dependency:

```shell
npm install --save-dev gulp-protractor
```

Then, add it to your `gulpfile.js`:

```javascript
var protractor = require("gulp-protractor");

gulp.src(["./src/tests/*.js"])
	.pipe(protractor({
		configFile: "test/protractor.config.js"
	}))	
```

### Protractor Webdriver
You have to start a standalone selenium server first. [Please read the offial instructions](https://github.com/angular/protractor#appendix-a-setting-up-a-standalone-selenium-server). 

If you don't want to install protractor globally, you can install it in your current directory with:

```shell
npm install --save-dev protractor
```

and use this snippet to install and run the websever

```javascript
// webdriver setup and run
gulp.task('webdriver', function(cb) {
    spawn('./node_modules/.bin/webdriver-manager', ['update'], { stdio: 'inherit' }).on('close', function() {
        spawn('./node_modules/.bin/webdriver-manager', ['start'], { stdio: 'inherit' }).on('close', function() {
            cb();
        });
    });
});
```


## API

### protractor(options)

#### options.configFile
Type: `String`  
Default: `null`

The path to your protractor config


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-protractor
[npm-image]: https://badge.fury.io/js/gulp-protractor.png

[travis-url]: http://travis-ci.org/mllrsohn/gulp-protractor
[travis-image]: https://secure.travis-ci.org/mllrsohn/gulp-protractor.png?branch=master

[depstat-url]: https://david-dm.org/mllrsohn/gulp-protractor
[depstat-image]: https://david-dm.org/mllrsohn/gulp-protractor.png
