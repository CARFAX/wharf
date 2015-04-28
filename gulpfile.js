var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    stylus = require('gulp-stylus'),
    concat = require('gulp-concat');

gulp.task('static.fonts', function() {
    gulp.src('lib/static/src/bower_components/materialize/dist/font/**/*')
        .pipe(gulp.dest('lib/static/dist/font'));
});

gulp.task('static.highlight', function() {
    gulp.src([
        'lib/static/src/highlight/highlight.pack.js'
    ])
        .pipe(gulp.dest('lib/static/dist/js'));
});

gulp.task('static.srccss', function() {
    gulp.src([
        'lib/static/src/css/src.styl'
    ])
        .pipe(stylus({
            compress: true
        }))
        .pipe(rename('wharf.src.min.css'))
        .pipe(gulp.dest('lib/static/dist/css'));
});

gulp.task('static.css', function() {
    gulp.src([
        'lib/static/src/bower_components/materialize/dist/css/materialize.min.css',
        'lib/static/src/css/gh-pages-material.css',
        'lib/static/src/highlight/**/*.css',
        'lib/static/src/css/main.styl'
    ])
        .pipe(stylus({
            compress: true
        }))
        .pipe(concat('wharf.min.css'))
        .pipe(gulp.dest('lib/static/dist/css'));
});

gulp.task('static.js', function() {
    gulp.src([
        'lib/static/src/bower_components/jquery/dist/jquery.min.js',
        'lib/static/src/bower_components/materialize/dist/js/materialize.min.js',
        'lib/static/src/js/*.js'
    ])
        .pipe(uglify())
        .pipe(concat('wharf.min.js'))
        .pipe(gulp.dest('lib/static/dist/js'));
});

gulp.task('static', ['static.js', 'static.css', 'static.fonts', 'static.srccss', 'static.highlight']);
gulp.task('compile', ['static']);
gulp.task('default', ['compile']);