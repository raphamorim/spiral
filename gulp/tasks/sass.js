var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');

var common = require('../config').common;

gulp.task('css', function() {
    gulp.src(common.allSCSSFiles)
        .pipe(sass())
        .pipe(concat('main.css'))
        .pipe(minify())
        .pipe(gulp.dest(common.dest.css))
});
