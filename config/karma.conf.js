module.exports = function (config) {
    'use strict';

    config.set({
        basePath: '../',

        frameworks: [
            'browserify', 'jasmine', 'jasmine-matchers'
        ],

        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'test/**/*.spec.js'
        ],

        preprocessors: {
            'test/**/*.spec.js': ['browserify']
        },

        browserify: {
            debug: true,
            transform: [
                ['browserify-istanbul', {
                    ignore: ['**/node_modules/**', '**/test/**', '**/public/**/*.html', '**/public/js/**/index.js', '**/public/js/**/namespace.js']
                }]
            ],
            configure: function (bundle) {
                bundle.on('prebundle', function () {
                    bundle.require('./public/js/app.js', {expose: 'app'});
                    bundle.require('./public/js/common', {expose: 'common'});
                    bundle.require('./public/js/guests', {expose: 'guests'});
                });
            }
        },

        port: 9000,
        colors: true,
        logLevel: config.LOG_INFO
    });
};
