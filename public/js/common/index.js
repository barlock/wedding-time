'use strict';

var namespace = require('./namespace');

module.exports = angular.module(namespace, [])
    .filter('interpolate', require('./filters/interpolate'));
