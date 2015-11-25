'use strict';

module.exports = function (gulp, plugins, dirs) {
    return function () {
        var sass = plugins.sass,
            options = {
                style: 'compressed',
                loadPath: [
                    dirs.node_modules + '/bootstrap-sass/assets/stylesheets'
                ]
            };
        return gulp.src(dirs.css + '/main.scss')
            .pipe(sass(options).on('error', sass.logError))
            .pipe(gulp.dest(dirs.build_css));
    };
};
