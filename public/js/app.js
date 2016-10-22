'use strict';


require('angular');
require('angular-bootstrap');
require('angular-resource');
require('angular-cookies');

var namespace = require('./namespace'),
    guest = require('./guests/namespace');

var app = angular.module(namespace, [
    require('./guests').name,
    require('./common').name,
    'ui.bootstrap',
    'ngCookies',
    'ngResource'
]);

app.run(function ($http, $cookies) {
    // For CSRF token compatibility with Django
    $http.defaults.headers.common['X-CSRF-Token'] = $cookies['XSRF-TOKEN'];
});
