'use strict';
/**
@fileOverview 
<p>Gulp file will handle remedial tasks for day to day options</p>
@author Jason Chang
*/

var gulp       = require('gulp');
var del        = require('del');
var path       = require('path');
// Organizes your browser code and loads modules installed by npm
var browserify = require('browserify');
// Compiles ES6 to ES5
var reactify   = require('reactify');
// Watches for changes in modules then rebuilds
var watchify   = require('watchify');
var source     = require('vinyl-source-stream');
var $          = require('gulp-load-plugins')();
var images     = require('gulp-image');

var prod = $.util.env.prod;

// gulp-plumber for error handling
function onError() {
    /* jshint ignore:start */
    var args = Array.prototype.slice.call(arguments);
    $.util.beep();
    $.notify.onError({
        title: "Compile Error",
        message: "<%= error.message %>"
    }).apply(this, args);
    this.emit('end'); // Keep gulp from hanging on this task
    /* jshint ignore:end */
}


// Styles
gulp.task('styles', function() {
    return gulp.src('src/styles/**/*')
        .pipe($.plumber({
            errorHandler: onError
        }))
        .pipe($.concat('main.scss'))
        .pipe($.rubySass({
            style: 'compressed',
            precision: 10,
            loadPath: ['src/bower_components']
        }))
        .pipe($.autoprefixer('last 3 versions'))
        .pipe(gulp.dest('dist/styles'))
        .pipe($.size());
});


// Scripts
gulp.task('scripts', function() {
    var bundler;
    bundler = browserify({
        basedir: __dirname,
        noparse: ['react/addons', 'reflux', 'fastclick', 'react-router'],
        entries: ['./src/scripts/app.jsx'],
        transform: [reactify],
        extensions: ['.jsx'],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    });

    bundler = watchify(bundler);

    function rebundle() {
        console.log('Bundling Scripts...');
        var start = Date.now();
        return bundler.bundle()
            .on('error', onError)
            .pipe(source('app.js'))
            .pipe(prod ? $.streamify($.uglify()) : $.util.noop())
            .pipe(gulp.dest('dist/scripts'))
            .pipe($.notify(function() {
                console.log('Bundling Complete - ' + (Date.now() - start) + 'ms');
            }));
    }

    bundler.on('update', rebundle);

    return rebundle();
});


// HTML
gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});


// // Images
// gulp.task('images', function() {
//     return gulp.src('src/images/*')
//         .pipe($.cache($.imagemin({
//             optimizationLevel: 3,
//             progressive: true,
//             interlaced: true
//         })))
//         .pipe(gulp.dest('dist/images'))
//         .pipe($.size());
// });

gulp.task('images', function () {
  gulp.src('./src/images/*')
    .pipe(images())
    .pipe(gulp.dest('./dist/images/'));
});


// Webserver
gulp.task('serve', function() {
    gulp.src('dist')
        .pipe($.webserver({
            livereload: true,
            port: 9000,
            fallback: 'index.html'
        }));
});


// Clean
gulp.task('clean', function(cb) {
    del(['dist/styles', 'dist/scripts', 'dist/images'], cb);
});


// Default task
gulp.task('default', ['clean', 'html', 'styles', 'images', 'scripts']);


// Watch
gulp.task('watch', ['html', 'images', 'styles', 'scripts', 'serve'], function() {
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/images/**/*', ['image']);
});
