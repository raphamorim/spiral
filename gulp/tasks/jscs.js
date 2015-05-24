var gulp = require('gulp');
var jscs = require('gulp-jscs');

var config = require('../config').common

gulp.task('jscs', function () {
  return gulp.src(config.allScriptFiles)
    .pipe(jscs())
});
