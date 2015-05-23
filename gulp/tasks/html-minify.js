var gulp = require('gulp');
var minifyHTML = require('gulp-minify-html');

var common = require('../config').common;

gulp.task('html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };

  return gulp.src(common.allHTMLFiles)
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest(common.dest.html));
});
