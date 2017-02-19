var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    flatten = require('gulp-flatten');

var styleLocation = 'sass/style.sass';
var jsLocation = 'js/**/*.js'
var buildLocation = 'static/';

// TODO Make this DRY

gulp.task("default", function () {
  gulp.src(styleLocation)
   .pipe(gulp.dest('./build/sass'));

  gulp.src(jsLocation)
   .pipe(gulp.dest('./build/js'));

  gulp.src('build/sass/**/*.{sass,scss}')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer())
    .pipe(flatten())
    .pipe(gulp.dest(buildLocation + 'css'));

  gulp.src('build/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest(buildLocation + 'js/'));
});

gulp.task("watch", function () {
  gulp.watch(styleLocation, function() {
    gulp.src(styleLocation)
      .pipe(sass({outputStyle: 'compressed'}))
      .pipe(autoprefixer())
      .pipe(gulp.dest(buildLocation + 'css/'));
  });
  gulp.watch(jsLocation, function () {
      gulp.src('build/js/**/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest(buildLocation + 'js/'));
  });
});
