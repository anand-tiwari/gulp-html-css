var gulp = require('gulp');

var jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    concatjs = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    webserver = require('gulp-webserver'),
    cleanCSS = require('gulp-clean-css');

// Define paths for js
var jsFiles = 'source/js/**/*.js',
    jsdest = 'assets/js';

// gulp jshint task
gulp.task('jserorrep', function() {
	return gulp.src(jsFiles)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
});

// gulp sass task
gulp.task('build-css', function() {
	return gulp.src('source/sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCSS())
		.pipe(rename('main.min.css'))
		.pipe(gulp.dest('assets/css'));
});

// gulp sass task
gulp.task('build-font', function() {
	return gulp.src('source/font-sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCSS())
		.pipe(rename('roboto-font.min.css'))
		.pipe(gulp.dest('assets/css'));
});

// gulp concat task
gulp.task('jsconcat', function() {
	return gulp.src(jsFiles)
		.pipe(concatjs('vendor.js'))
		.pipe(rename('vendor.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(jsdest))
});

// gulp webserver task
gulp.task('runserver', function() {
	return gulp.src('.')
		.pipe(webserver({
			port: '4000',
			livereload: true,
            open: true,
            fallback: 'index.html'
		}));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
    gulp.watch('source/js/**/*.js', ['jserorrep']);
    gulp.watch('source/sass/**/*.scss', ['build-css']);
    gulp.watch('source/font-sass/**/*.scss', ['build-font']);
    gulp.watch(jsFiles, ['jsconcat']);
});

// define the default task and add the watch task to it
gulp.task('default', ['watch', 'jserorrep', 'build-css', 'build-font', 'jsconcat', 'runserver']);