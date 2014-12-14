'use strict';

define(['angular'], function (angular) {
	angular.module('weddingTime.services', [])
        .factory("guests", function ($http) {
            return function () {
                return $http.get("/api/v1/guests")
                    .error(function () {
                        return { data: [] };
                    });
            };
        })
});
