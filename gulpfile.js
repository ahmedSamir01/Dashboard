let gulp = require('gulp'),
    image = require('gulp-image'),
    prefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    newer = require('gulp-newer'),
    minify = require('gulp-minify');


// html collection
gulp.task('html', function () {
    return gulp.src('stage/html/*.pug')
        .pipe(newer('dist/html'))
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('dist'))
});


// css collection
gulp.task('css', function () {
    return gulp.src(['stage/css/**/*.css', 'stage/css/**/*.scss'])
        .pipe(newer('dist/css'))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('erorr', sass.logError))
        .pipe(prefix())
        .pipe(concat('main.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
});


// js collection
gulp.task('js', function () {
    return gulp.src('stage/js/*.js')
        .pipe(newer('dist/html'))
        .pipe(concat('main.js'))
        .pipe(minify())
        .pipe(gulp.dest('dist/js'))
});


// watch
gulp.task('watch', function () {
    gulp.watch('stage/html/*.pug', ['html']);
    gulp.watch(['stage/css/**/*.css', 'stage/css/**/*.scss'], ['css']);
    gulp.watch('stage/js/*.js', ['js']);
});




