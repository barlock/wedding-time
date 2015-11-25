'use strict';

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    dirs = {
        js: 'public/js',
        css: 'public/css',
        images: 'public/images/**/*',
        fonts: 'public/fonts/**/*',
        templates: 'public/templates/**/*',
        build: '.build',
        build_js: '.build/js',
        build_css: '.build/css',
        build_assets: '.build/css/assets'
    };

function getTask (task) {
    return require('./tasks/' + task)(gulp, plugins, dirs);
}

gulp.task('clean', getTask('clean'));
gulp.task('jshint', getTask('jshint'));
gulp.task('browserify', getTask('browserify'));
gulp.task('sass', getTask('sass'));

var copy = getTask('copy');
gulp.task('copy-assets', copy.assets);
gulp.task('copy-css', copy.css);
gulp.task('copy-js', copy.js);

var karma = getTask('karma');
gulp.task('karma-ci', karma.ci);
gulp.task('karma-dev', karma.dev);

gulp.task('build', gulp.series('clean', gulp.parallel('jshint', 'karma-ci', 'sass', 'browserify', 'copy-assets')));
