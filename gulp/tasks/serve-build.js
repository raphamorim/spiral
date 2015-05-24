var gulp = require('gulp');
var webserver = require('gulp-webserver');

var common = require('../config').common;

gulp.task('serve', function() {
  gulp.src(common.dest.base)
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});
