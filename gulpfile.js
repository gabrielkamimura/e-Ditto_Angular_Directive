var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    pump = require('pump');


gulp.task('minify', function(cb) {
  pump([
        gulp.src('src/editto-angular.js'),
        concat('editto-angular.min.js'),
        uglify(),
        gulp.dest('src')
    ], cb);
});
