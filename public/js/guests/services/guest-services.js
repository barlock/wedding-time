'use strict';

module.exports = ['$resource', function ($resource) {
    return $resource('/api/v1/guests/:id', {}, {
        update: {
            method: 'PUT'
        }
    });
}];
