'use strict';

function RsvpController($scope, $window, GuestServices) {
    $scope.guest = {};
    $scope.attending = {};
    $scope.attempts = 0;

    $scope.validate = function (rsvpCode) {
        GuestServices.get({rsvp: rsvpCode}, function (guest) {
            $scope.guest = angular.copy(guest);

            if (guest.rsvpd) {
                angular.forEach(guest.namesComing, function (name) {
                    $scope.attending[name] = true;
                });
            } else {
                angular.forEach(guest.namesInvited, function (name) {
                    $scope.attending[name] = true;
                });
            }


            $scope.attempts++;
        });
    };

    $scope.giveUp = function () {
        $scope.guest = {};
    };

    $scope.submit = function () {
        var guestCount = $scope.guest.guestComing ? 1 : 0;

        $scope.guest.rsvpd = true;

        $scope.guest.namesComing = [];

        angular.forEach($scope.attending, function (value, key) {
            if (value) {
                $scope.guest.namesComing.push(key);
            }
        });

        $scope.guest.numberComing = $scope.guest.namesComing.length + guestCount;

        $scope.guest.coming = $scope.guest.numberComing > 0;

        console.log($scope.guest)

        GuestServices.update({id: $scope.guest._id}, $scope.guest, function () {
            $scope.success = true;
        });
    };
}

module.exports = ['$scope', '$window', require('../namespace') + '.GuestServices', RsvpController];
