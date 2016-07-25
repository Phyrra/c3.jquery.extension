'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var jscs = require('gulp-jscs');
var browserSync = require('browser-sync').create();
var Server = require('karma').Server;

gulp.task('sass', function () {
  gulp.src('scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('.'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./scss/*.scss', ['sass']);
});

gulp.task('test', function(done) {
    new Server({
        configFile: __dirname + '/karma.config.js',
        singleRun: true
    }, done).start();
});

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: './'
    });

    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch(['*.html', '*.css', '*.js']).on('change', browserSync.reload);
});

gulp.task('jscs', function() {
    return gulp.src('./c3.jquery.extension.js')
        .pipe(jscs())
        .pipe(jscs.reporter());
});