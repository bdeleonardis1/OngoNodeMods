gulp-add-src
============

Add more 'src' files at any point in the pipeline

Copyright (C) 2014, Uri Shaked <uri@urish.org> and contributors

[![Build Status](https://travis-ci.org/urish/gulp-add-src.png?branch=master)](https://travis-ci.org/urish/gulp-add-src)

Installation
------------

`npm install gulp-add-src --save-dev`

Usage
-----
Works like `gulp.src`, but you can put it anywhere in your pipeline and it will append the given files
to the pipeline.

Example:
```js
var gulp = require('gulp');
var addsrc = require('gulp-add-src');
var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify');

gulp.task('build', function () {
  return gulp.src('files/coffee/*.coffee')   // start with the .coffee files in the project
	.pipe(coffee())                          // compiles coffee script
	.pipe(addsrc('files/js/*.js'))           // we use addsrc to add our .js files to the mix
	.pipe(uglify())                          // we minify everything
	.pipe(gulp.dest('dist'));                // and write to dist
});
```

The order of files when the streams are merged is not guaranteed. If you need to preserve order and specifically append/prepend files,  you can use `addsrc.append` and `addsrc.prepend`, respectively, in place of just `addsrc` in the example above.

As an example, this would be useful if you wanted to merge your `bower` scripts with your app scripts. You'd need your `bower` scripts to maintain their order (the `bower` scripts themselves) and make sure they come before your app scripts. In this case, you'd use `addsrc.prepend`.

Because of the unpredicabilty of `addsrc` alone, it's recommended to use one of the append/prepend variants. The original is only left in place for legacy reasons.

License
----

Released under the terms of MIT License:

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


