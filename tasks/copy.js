'use strict';

module.exports = function (gulp, plugins, dirs) {
    var assets = function () {
        return gulp.src([dirs.images, dirs.fonts, dirs.templates], {base: './public'})
            .pipe(gulp.dest(dirs.build));
    };

    var css = function () {
        return gulp.src(dirs.css + '/**/*', {base: './public'})
            .pipe(gulp.dest(dirs.build));
    };

    var js = function () {
        return gulp.src(dirs.js + '/**/*', {base: './public'})
            .pipe(gulp.dest(dirs.build));
    };

    return {
        assets: assets,
        css: css,
        js: js
    };
};
