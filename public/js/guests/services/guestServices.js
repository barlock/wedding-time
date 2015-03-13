define([
    '../module',
    '../namespace'
], function (module, namespace) {
    'use strict';

    var name = namespace + ".GuestServices";

    module.factory(name, ['$resource', function ($resource) {
        return $resource("/api/v1/guests/:id", {}, {
            update: {
                method: 'PUT'
            }
        });
    }])
});
