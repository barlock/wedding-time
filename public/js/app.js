"use strict";

define([
    "angular",
    "filters",
    "services",
    "directives",
    "controllers",
    "bootstrap",
    "angular-bootstrap",
    "angular-cookies",
], function (angular) {
    var app = angular.module("weddingTime", [
        "weddingTime.filters",
        "weddingTime.services",
        "weddingTime.directives",
        "weddingTime.controllers",
        "ui.bootstrap",
        "ngCookies"
    ]);

    app.run( function ( $http, $cookies ){
        // For CSRF token compatibility with Django
        $http.defaults.headers.common['X-CSRF-Token'] = $cookies["XSRF-TOKEN"];
    });

    app.init = function() {
        angular.bootstrap(document, ["weddingTime"]);
    };

    return app;
});
