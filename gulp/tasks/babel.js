var gulp = require('gulp');
var babel = require('gulp-babel');

var common = require('../config').common;

gulp.task('javascript', function () {
    return gulp.src(common.allScriptFiles)
        .pipe(babel())
        .pipe(gulp.dest(common.dest.javascript));
});
