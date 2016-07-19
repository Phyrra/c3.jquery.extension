'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var jasmineBrowser = require('gulp-jasmine-browser');
var browserSync = require('browser-sync').create();
 
gulp.task('sass', function () {
  gulp.src('scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('.'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./scss/*.scss', ['sass']);
});

gulp.task('test', function() {
	return gulp.src(['bower_components/jquery/dist/jquery.min.js', 'c3.jquery.extension.js', 'specs/*.js'])
		.pipe(jasmineBrowser.specRunner({ console: true }))
		.pipe(jasmineBrowser.headless());
});

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: './'
    });

    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch(['*.html', '*.css', '*.js']).on('change', browserSync.reload);
});