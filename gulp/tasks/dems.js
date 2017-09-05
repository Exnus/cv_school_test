const gulp = require('gulp');
const fc2json = require('gulp-file-contents-to-json');

gulp.task('dems', function () {
  return gulp.src('../annotations/**/*.txt')
    .pipe(fc2json('annotations.json'))
    .pipe(gulp.dest('../annotations/'));
});