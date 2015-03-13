define([
    '../module',
    '../namespace',
], function (module, namespace) {
    'use strict';

    var name = namespace + ".RsvpController";

    module.controller(name, ['$scope', '$window', namespace + '.GuestServices', function ($scope, $window, GuestServices) {
        $scope.guest = {};
        $scope.attending = {};
        $scope.attempts = 0;

        $scope.validate = function (rsvpCode) {
           GuestServices.get({ rsvp : rsvpCode }, function(guest) {
               $scope.guest = angular.copy(guest);
               angular.forEach(guest.namesInvited, function(name) {
                   $scope.attending[name] = true;
               });
               $scope.attempts++;
           });
        };

        $scope.giveUp = function() {
            $scope.guest = {};
        }

        $scope.submit = function() {
            $scope.guest.rsvpd = true;
            $scope.guest.namesComing = Object.keys($scope.attending);
			var guestId = $scope.guest._id;
            GuestServices.update({ id: guestId }, $scope.guest, function() {
                $window.location.href = "/accommodations";
            });
        }
    }])
});
