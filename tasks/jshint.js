'use strict';

module.exports = function (gulp, plugins) {
    return function () {
        var jshint = plugins.jshint;
        return gulp.src(['controllers/**/*.js', 'public/js/**/*.js', 'lib/**/*.js', 'models/**/*.js', 'test/**/*.js', 'tasks/*.js', 'gulpfile.js'])
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(jshint.reporter('fail'));
    };
};
