'use strict';

const gulp = require('gulp'),
  sass = require('gulp-sass'),
  plumber = require('gulp-plumber'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  server = require('browser-sync').create(),
  svgmin = require('gulp-svgmin'),
  cheerio = require('gulp-cheerio'),
  replace = require('gulp-replace'),
  sprite = require('gulp-svg-sprite'),
  rename = require('gulp-rename'),
  minify = require("gulp-csso"),
  del = require('del'),
  htmlmin = require('gulp-htmlmin'),
  posthtml = require('gulp-posthtml'),
  include = require('posthtml-include'),
  uglify = require('gulp-uglify'),
  run = require('run-sequence');

gulp.task('style', function () {
  gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sass({
      includePaths: require('node-normalize-scss').includePaths
    }))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'));
});

gulp.task('sprite', function () {
  return gulp.src('source/img/*.svg')
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: {
        xmlMode: true
      }
    }))
    .pipe(replace('&gt;', '>'))
    .pipe(sprite({
      mode: {
        symbol: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(gulp.dest('source/img'));
});

gulp.task('clean', function () {
  return del('build');
});

gulp.task('copy', function () {
  return gulp
    .src(
      [
        'source/fonts/**/*.woff2',
        'source/img/sprite.svg',
        'source/js/*.js'
      ], {
        base: 'source'
      }
    )
    .pipe(gulp.dest('build'));
});

gulp.task('html', function () {
  return gulp
    .src('source/*.html')
    .pipe(
      htmlmin({
        collapseWhitespace: true
      })
    )
    .pipe(posthtml([include()]))
    .pipe(gulp.dest('build'));
});

gulp.task('compress', function () {
  gulp.src('source/js/*.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('build/js'));
});

gulp.task('build', function (done) {
  run('clean', 'style', 'copy', 'html', 'compress', done);
});

gulp.task('serve', ['style'], function () {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/sass/**/*.{scss,sass}', ['style']);
  gulp.watch('source/*.html').on('change', server.reload);
});
