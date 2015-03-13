define([
    '../module',
    '../namespace',
], function (module, namespace) {
    'use strict';

    var name = namespace + ".RsvpController";

    module.controller(name, ['$scope', '$window', namespace + '.GuestServices', function ($scope, $window, GuestServices) {
        $scope.guest = {};
        $scope.namesComing = [];
        $scope.attempts = 0;

        $scope.validate = function (rsvpCode) {
           GuestServices.get({ rsvp : rsvpCode }, function(guest) {
               $scope.guest = angular.copy(guest);
               $scope.namesComing = initInvitedGuests(guest);
               $scope.attempts++;
           });
        };

        var initInvitedGuests = function (guest) {
            var namesComing = new Array(guest.namesInvited.length), i = 0;
            for (; i < namesComing.length; ++i) {
                namesComing[i] = true;
            }
            return namesComing;
        }

        $scope.giveUp = function() {
            $scope.guest = {};
        }

        $scope.submit = function() {
            $scope.guest.rsvpd = true;
            $scope.guest.namesComing = getGuestsComing();
			var guestId = $scope.guest._id;
            GuestServices.update({ id: guestId }, $scope.guest, function() {
                $window.location.href = "/accommodations";
            });
        }

        var getGuestsComing = function() {
            var namesComing = [], i = 0, length = $scope.namesComing.length;
            for (; i < length; i++) {
                if ($scope.namesComing[i]) {
                    namesComing.push($scope.guest.namesInvited[i]);
                }
            }
            return namesComing;
        }
    }])
});
