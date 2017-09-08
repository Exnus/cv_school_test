const gulp = require('gulp');
const jimp = require('gulp-jimp');

gulp.task('flip', function () {
  gulp.src('../fragments/**/*.png')
    .pipe(jimp({
      '_flip': {
        flip: { horizontal: true, vertical: false }
      }
    }))
    .pipe(gulp.dest('../fragments_flip/'));
});
