"use strict";

define([
    "angular",
    "namespace",
    "./guests/namespace",
    "./guests/module.require",
    "filters",
    "bootstrap",
    "angular-bootstrap",
    "angular-cookies"
], function (angular, namespace, guestsNamespace) {
    var app = angular.module(namespace, [
        guestsNamespace,
        "weddingTime.filters",
        "ui.bootstrap",
        "ngCookies"
    ]);

    app.run( function ( $http, $cookies ){
        // For CSRF token compatibility with Django
        $http.defaults.headers.common['X-CSRF-Token'] = $cookies["XSRF-TOKEN"];
    });

    app.init = function() {
        angular.bootstrap(document, [namespace]);
    };

    return app;
});
