var gulp = require('gulp');
gulp.task('components', function () {
  return gulp
    .src(['*packages/**/*', '*src/**/*', '*lib/**/*'])
    .pipe(gulp.dest('components'))
});

gulp.task("copy", gulp.series('components'), function () {

});