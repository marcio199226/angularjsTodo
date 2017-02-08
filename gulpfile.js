var gulp              = require('gulp');
var browserify        = require('browserify');
var uglify            = require('gulp-uglify');
var util              = require('gulp-util');
var replace           = require('gulp-replace');
var htmlmin           = require('gulp-htmlmin');
var debowerify        = require('debowerify');
var source            = require('vinyl-source-stream');
var streamify         = require('gulp-streamify');
var rename            = require('gulp-rename');
var watch             = require('gulp-watch');
var minifyCSS         = require('gulp-minify-css');
var webserver         = require('gulp-webserver');
var concatCss         = require('gulp-concat-css');
var assetsVersioning  = require('gulp-version-append');
var less              = require('gulp-less');


var config = {
    production        : !!util.env.production,
    gzip              : !!util.env.gzip,
    prod_dist_path    : '', //path che viene aggiunto ad ogni templateUrl se la cartella dist/ e nella webroot lasciare vuoto,
    minifyCss         : {
      comments: true,
      spare: true
    }
};

gulp.task('copy-html-files', function () {
  gulp.src(['./app/**/*.html', '!./app/index.html'])
    .pipe(!config.production ? gulp.dest('dist/tpl/') : util.noop());

  gulp.src(['./app/index.html', './app/.htaccess'])
    .pipe(assetsVersioning(['html', 'js', 'css']))
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy-img-files', function () {
  gulp.src(['./assets/images/**/*'])
    .pipe(gulp.dest('dist/images/'))
    .pipe(gulp.dest('dist/css/images/'));
});

gulp.task('copy-js-files', function () {
  gulp.src(['./assets/js/**/*'])
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('copy-vendors-css', function () {
  gulp.src(['./bower_components/**/dist/css/*.css', './bower_components/**/dist/*.css', './bower_components/**/build/css/*.css'])
    .pipe(concatCss("vendors.css"))
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('build-less', function () {
  gulp.src('./assets/css/include.less')
    .pipe(less())
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('minify-css', function () {
  gulp.src('./dist/css/include.css')
    .pipe(config.production ? minifyCSS(config.minifyCss) : util.noop())
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('copy-fonts', function () {
  gulp.src(['./bower_components/**/fonts/*'])
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('browserify', function () {
  var bundleStream = browserify('./app/app.js')
    .transform(debowerify)
    .bundle()

  bundleStream
    .pipe(source('./app/app.js'))
    .pipe(config.production ? replace('/tpl/', config.prod_dist_path + '/tpl/') : util.noop())
    .pipe(config.production ? streamify(uglify()) : util.noop())
    .pipe(rename('main.js'))
    .pipe(config.gzip ? gzip({ extension : 'gz' }) : util.noop())
    .pipe(gulp.dest('./dist/js/'))
});

gulp.task('devwebserver', function () {
  gulp.src('./dist')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: false,
      fallback: 'index.html',
      port: 8008,
    }));
});


// The default task (called when you run `gulp` from cli)
gulp.task('default', ['copy-html-files', 'browserify', 'copy-vendors-css', 'build-less', 'copy-img-files', 'copy-fonts'], function () {
  watcherJS = watch('./app/**/*.js', function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.start('browserify');
  });
  watcherHTML = watch('./app/**/*.html', function (event) {
    gulp.start(['copy-html-files']);
  });
  watchAssetsCSS = watch(['./assets/**/*.less', './app/routes/**/*.less', './app/core/components/**/*.less'], function (event) {
    gulp.start(['build-less', 'minify-css']);
  });
  watcherImg = watch('./assets/img/**/*', function (event) {
    gulp.start('copy-img-files');
  });
});

