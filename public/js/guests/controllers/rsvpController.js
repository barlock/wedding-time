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
            GuestServices.get({rsvp: rsvpCode}, function (guest) {
                $scope.guest = angular.copy(guest);
                angular.forEach(guest.namesInvited, function (name) {
                    $scope.attending[name] = true;
                });
                $scope.attempts++;
            });
        };

        $scope.giveUp = function () {
            $scope.guest = {};
        }

        $scope.submit = function () {
            $scope.guest.rsvpd = true;
            angular.forEach($scope.attending, function (value, key) {
                if (value) {
                    $scope.guest.namesComing.push(key);
                }
            });
            $scope.guest.numberComing = $scope.guest.namesComing.length;
            GuestServices.update({id: $scope.guest._id}, $scope.guest, function () {
                $window.location.href = "/accommodations";
            });
        }
    }])
});
