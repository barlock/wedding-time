define([
    '../module',
    '../namespace'
], function (module, namespace) {
    'use strict';

    var name = namespace + ".GuestServices";

    module.factory(name, ['$http', function ($http) {
        return function () {
            return $http.get("/api/v1/guests")
                .error(function () {
                    return {data: []};
                });
        };
    }])
});
