'use strict';

var namespace = require('./namespace');

module.exports = angular.module(namespace, [])
    .directive('guestForm', require('./directives/guest-form'))
    .factory(namespace + '.GuestServices', require('./services/guest-services'))
    .controller(namespace + '.GuestListController', require('./controllers/guest-list-controller'))
    .controller(namespace + '.RsvpController', require('./controllers/rsvp-controller'))
