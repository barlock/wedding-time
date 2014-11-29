"use strict";

define([
    "angular",
    "filters",
    "services",
    "directives",
    "controllers",
    "bootstrap"
], function (angular) {
    var app = angular.module("weddingTime", [
        "weddingTime.filters",
        "weddingTime.services",
        "weddingTime.directives",
        "weddingTime.controllers"
    ]);

    app.init = function() {
        angular.bootstrap(document, ["weddingTime"]);
    };

    return app;
});
