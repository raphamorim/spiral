// var gulp = require('gulp');

// gulp.task('default', function() {
//   // place code for your default task here
// });


var requireDir = require('require-dir');
requireDir('./gulp/tasks', { recurse: true });
