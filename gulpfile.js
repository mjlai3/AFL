'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var browserSyncLib = require('browser-sync');

var browserSync = browserSyncLib.create();

gulp.task('serve', [
	'copy',
	'sass',
	'scripts',
	'browser-sync'
]);

gulp.task('copy', function() {
	gulp.src(['./src/index.html', './src/SpecRunner.html'])
		.pipe(gulp.dest('./docs'));
	gulp.src(['./src/_assets/**/*.*'])
		.pipe(gulp.dest('./docs/assets'));
	gulp.src(['./src/_data/**/*.*'])
		.pipe(gulp.dest('./docs/data'));
	gulp.src(['./src/_views/**/*.*'])
		.pipe(gulp.dest('./docs/views'));
});

gulp.task('test', function() {
	gulp.src(['./src/index.html'])
		.pipe(gulp.dest('./docs'));
});

gulp.task('sass', function() {
	return gulp.src('./src/_styles/main.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest('./docs/styles'));
});

gulp.task('scripts', () => {
	return gulp.src('./src/_scripts/**/*.js')
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./docs/scripts'));
});

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: './docs'
		}
	});
});