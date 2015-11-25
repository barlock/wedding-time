'use strict';
var del = require('del');

module.exports = function (gulp, plugins, dirs) {
    return function () {
        return del([dirs.build]);
    };
};
