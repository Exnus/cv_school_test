const gulp = require('gulp');
const jimp = require('gulp-jimp');

gulp.task('normalize', function () {
  gulp.src('../fragments_flip/**/*.png')
    .pipe(jimp({
      '': {
        normalize: 255
      }
    }))
    .pipe(gulp.dest('../fragments_flip/'));
});
