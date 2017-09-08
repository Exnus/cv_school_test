const gulp = require('gulp');
const jimp = require('gulp-jimp');

gulp.task('greyscale', function () {
  gulp.src('../fragments/**/*.png')
    .pipe(jimp({
      '_grey': {
        greyscale: true
      }
    }))
    .pipe(gulp.dest('../fragments_greyscale/'));
});
