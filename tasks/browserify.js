'use strict';

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

module.exports = function (gulp, plugins, dirs) {
    return function () {
        var b = browserify({
            entries: 'public/js/app.js',
            debug: true
        });

        return b.bundle()
            .pipe(source('app.js'))
            .pipe(buffer())
            .pipe(plugins.sourcemaps.init({loadMaps: true}))
            // Add transformation tasks to the pipeline here.
            .pipe(plugins.uglify())
            .on('error', plugins.util.log)
            .pipe(plugins.sourcemaps.write('./'))
            .pipe(gulp.dest(dirs.build_js));
    };
};
