# gulp-protractor [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]

> Run your [angular protractor](https://github.com/angular/protractor) tests with [gulp](https://github.com/wearefractal/gulp)

## Usage

First, install `gulp-protractor` AND `protractor` as a development dependency:

```shell
npm install --save-dev gulp-protractor protractor
```

Then, add it to your `gulpfile.js`:

```javascript
var protractor = require("gulp-protractor").protractor;

gulp.src(["./src/tests/*.js"])
	.pipe(protractor({
		configFile: "test/protractor.config.js"
	}))	
	.on('error', function(e) { throw e })
```

### Protractor Webdriver
You have to update and start a standalone selenium server. [Please read the offical instructions](https://github.com/angular/protractor#appendix-a-setting-up-a-standalone-selenium-server). You can use the build in webdriver snippet. 

```javascript
var webdriver = require("gulp-protractor").webdriver;
gulp.task('webdriver', webdriver);
```

## API

### protractor(options)

#### options.configFile
Type: `String`  
Default: `null`

The path to your protractor config

#### options.args
Type: `Array`  
Default: `[]`

Arguments get passed directly to the protractor call [Read the docs for more information](https://github.com/angular/protractor/blob/master/docs/getting-started.md#setup-and-config)


#### options.debug
Type: `Boolean`  
Default: `false`

Runs protractor with the debug flag [Protractor Debugging documentation](https://github.com/angular/protractor/blob/master/docs/debugging.md#timeouts)


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-protractor
[npm-image]: https://badge.fury.io/js/gulp-protractor.png

[travis-url]: http://travis-ci.org/mllrsohn/gulp-protractor
[travis-image]: https://secure.travis-ci.org/mllrsohn/gulp-protractor.png?branch=master

[depstat-url]: https://david-dm.org/mllrsohn/gulp-protractor
[depstat-image]: https://david-dm.org/mllrsohn/gulp-protractor.png
