# gulp-protractor [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]

> Run your [angular protractor](https://github.com/angular/protractor) tests with [gulp](https://github.com/wearefractal/gulp)

## Usage

First, install `gulp-protractor` AND `protractor` as a development dependency:

```shell
npm install -g protractor
npm install --save-dev gulp-protractor
```

Then, add it to your `gulpfile.js`:

```javascript
var protractor = require("gulp-protractor").protractor;

gulp.src(["./src/tests/*.js"])
	.pipe(protractor({
		configFile: "test/protractor.config.js",
    args: ['--baseUrl', 'http://127.0.0.1:8000']
	}))	
	.on('error', function(e) { throw e })
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

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-protractor
[npm-image]: https://badge.fury.io/js/gulp-protractor.png

[travis-url]: http://travis-ci.org/mllrsohn/gulp-protractor
[travis-image]: https://secure.travis-ci.org/mllrsohn/gulp-protractor.png?branch=master

[depstat-url]: https://david-dm.org/mllrsohn/gulp-protractor
[depstat-image]: https://david-dm.org/mllrsohn/gulp-protractor.png
