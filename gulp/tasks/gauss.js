const gulp = require('gulp');
const jimp = require('gulp-jimp');

gulp.task('gauss', function () {
  gulp.src('../fragments/**/*.png')
    .pipe(jimp({
      '_noise': {
        gaussian: 3
      }
    }))
    .pipe(gulp.dest('../fragments_noise/'));
});
