"use strict";

const fs = require('fs');
const gulp = require('gulp');
const jimp = require('gulp-jimp');
var log = require('gulp-util').log;
const fc2json = require('gulp-file-contents-to-json');

gulp.task('annotations', function () {
  log('Try to create annotations.json from txt files...');
  return gulp.src('../annotations/**/*.txt')
    .pipe(fc2json('annotations.json'))
    .pipe(gulp.dest('../annotations/'));
});

gulp.task('crop', function () {
  var annotations = JSON.parse(fs.readFileSync('../annotations/annotations.json'));
  annotations = getAnnotationsFromJson(annotations);
  for (var annotation in annotations) {
    if (annotations.hasOwnProperty(annotation)) {
      gulp.src('../images/'+ annotation)
        .pipe(jimp(annotations[annotation]))
        .pipe(gulp.dest('../fragments/'));
    }
  }
});

function txtToPng(filename) {
  return filename.slice(0, filename.indexOf('.txt')) + '.png';
}

function getAnnotationsFromJson(annotations) {
  var jimpAnnotations = {};
  for (var annotation in annotations) {
    if (annotations.hasOwnProperty(annotation)) {
      var fileAnnotations = annotations[annotation].split('\r\n');
      var fileAnnotationsObj = {};
      fileAnnotations.map(function(fileAnnotation, number) {
        var points = fileAnnotation.split(',');
        return fileAnnotationsObj['_' + number] = {
          crop: {
            x: +points[0],
            y: +points[1],
            width: points[2]-points[0],
            height: points[3]-points[1]
          }
        }
      });
      jimpAnnotations[txtToPng(annotation)] = fileAnnotationsObj;
    }
  }
  return jimpAnnotations;
}
