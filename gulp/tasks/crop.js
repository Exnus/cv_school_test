"use strict";

const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const jimp = require('gulp-jimp');
var es = require('event-stream');
var log = require('gulp-util').log;

var annotations = JSON.parse(fs.readFileSync('../annotations/annotations.json'));

var cropImage = function(es) { log(es);
  var es1 = es.map(function(file) {
    var filename  = getFileName(file);
    var fileAnnotations = getFileAnnotations(filename);
    fileAnnotations.forEach(function(annotation, i) { //log(toJimpFormat(annotation, i));
      return jimp(toJimpFormat(annotation, i));
    });
  }); log(es1);
  return es.pipe(es1);
};

gulp.task('crop', function () {
  return gulp.src('../images/*.png')
    /*.pipe(jimp({
      '_0': {
        crop: { x: 100, y: 100, width: 200, height: 200 }
      }
    }))*/
    .pipe(cropImage(es))
    .pipe(gulp.dest('./fragments/'));
});

function getFileName(file) {
  var path = file.path.split('/');
  return path[path.length-1];
}

function pngToTxt(filename) {
  return filename.slice(0, filename.indexOf('.png')) + '.txt';
}

function getFileAnnotations(filename) {
  var annotationFileName = pngToTxt(filename);  //log(annotationFileName);
  if (annotations.hasOwnProperty(annotationFileName)) {
    //log(annotations[annotationFileName]);
    var fileAnnotations = annotations[annotationFileName].split('\r\n');
    //log(fileAnnotations);
    fileAnnotations = fileAnnotations.map(function(annotation) {
      var points = annotation.split(',');
      return {
        x: +points[0],
        y: +points[1],
        width: points[2]-points[0],
        height: points[3]-points[1]
      }
    });
    //log(fileAnnotations);
    return fileAnnotations;
  }
}

function toJimpFormat(annotation, number) {
  return {
    ['-' + number]: {
      crop: annotation
    }
  }
}