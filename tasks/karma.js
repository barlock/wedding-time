'use strict';

module.exports = function(gulp, plugins, dirs) {
    var Server = require('karma').Server;

    var ci = function (done) {
        new Server({
            configFile: __dirname + '/../config/karma.conf.js',
            singleRun: true,
            browsers: ['PhantomJS'],
            reporters: ['progress', 'coverage'],
            coverageReporter: {
                dir: dirs.build + '/reports/coverage',
                reporters: [
                    {type: 'text-summary'},
                    {type: 'text'},
                    {type: 'cobertura', file: 'cobertura.xml'}
                ]
            },
            junitReporter: {
                outputDir: dirs.build_reports + '/results',
                outputFile: 'test-results.xml'
            }
        }, done).start();
    };

    var dev = function (done) {
        new Server({
            configFile: __dirname + '/../config/karma.conf.js',
            autoWatch: true,
            browsers: ['Chrome']
        }, done).start();
    };

    return {
        ci: ci,
        dev: dev
    };
};
