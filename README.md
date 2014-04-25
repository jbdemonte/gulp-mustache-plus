# gulp-mustache-plus [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]

> mustache plugin for [gulp](https://github.com/wearefractal/gulp)

Forked from [gulp-mustache](https://github.com/rogeriopvl/gulp-mustache) to add some features.

## Usage

First, install `gulp-mustache-plus` as a development dependency:

```shell
npm install --save-dev gulp-mustache-plus
```

Then, add it to your `gulpfile.js`:

```javascript
var mustache = require("gulp-mustache-plus");

gulp.src("./templates/*.mustache")
	.pipe(mustache({
		msg: "Hello Gulp!"
	}))
	.pipe(gulp.dest("./dist"));
```

You may also pass in an object representing mustache partials and their contents
as a third argument to the call to `mustache()` like so:

```javascript
gulp.src("./templates/*.mustache")
	.pipe(mustache({
		msg: "Hello Gulp!",
		nested_value: "I am nested.",
		another_value: "1 2 3"
	},{},{
		some_inner_partial: "<p>{{nested_value}}</p>",
		another_partial: "<div>{{another_value}}</div>"
	})).pipe(gulp.dest("./dist"));
```

With gulp-mustach-plus, you also can use file in partials:

```javascript
gulp.src("./templates/*.mustache")
	.pipe(mustache({
		msg: "Hello Gulp!",
		nested_value: "I am nested.",
		another_value: "1 2 3"
	},{},{
		some_inner_partial: "<p>{{nested_value}}</p>",
		another_partial: "<div>{{another_value}}</div>",
		file_1: "src/data/file_1",
		file_2: "src/data/file_2"
	})).pipe(gulp.dest("./dist"));
```

## API

### mustache(view, options, partials)

#### view
Type: `hash` or `string`
Default: `undefined`

The view object, containing all template variables as keys. If you pass a `string` it will be used as the path to a JSON file containing view variables.

#### options
Type: `hash`
Default: `{ extension: '.html' }`

The options object to configure the plugin.

##### options.extension
Type: `string`
Default: `.html`

##### options.file_prepend
Type: `string`
Default: ``

Prepend each partial file with a string (e.g., useful to add `\n` before each file insertion).

#### partials
Type: `hash`
Default: `{}`

An optional object of mustache partial strings. See [mustache.js](https://github.com/janl/mustache.js/) for details on partials in mustache.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-mustache-plus
[npm-image]: https://badge.fury.io/js/gulp-mustache-plus.png

[travis-url]: http://travis-ci.org/jbdemonte/gulp-mustache-plus
[travis-image]: https://secure.travis-ci.org/jbdemonte/gulp-mustache-plus.png?branch=master

[depstat-url]: https://david-dm.org/jbdemonte/gulp-mustache-plus
[depstat-image]: https://david-dm.org/jbdemonte/gulp-mustache-plus.png
