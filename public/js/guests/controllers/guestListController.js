define([
    '../module',
    '../namespace',
], function (module, namespace) {
    'use strict';

    var name = namespace + ".GuestListController";

    module.controller(name, ['$scope', namespace + '.GuestServices', function ($scope, GuestServices) {
        $scope.guests = [];
        $scope.alerts = [];

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        function validateGuest(guestObj) {
            var alerts = [];

            angular.forEach($scope.guests, function (guest) {
                if (guestObj.id !== guest.id &&
                    guest.rsvpCode === guestObj.rsvpCode) {
                    alerts.push({
                        msg: "RSVP Code must be unique",
                        type: "danger"
                    });
                }
            });

            return alerts;
        }

        $scope.addGuest = function (newGuest) {
            var alerts = validateGuest(newGuest);

            if (newGuest && alerts.length === 0) {
                GuestServices.save(newGuest).$promise.then(
                    function success(data) {
                        newGuest._id = data.id;
                        $scope.guests.push(newGuest);
                    },
                    function error(data) {
                        $scope.alerts.push({msg: data, type: "danger"});
                    }
                );
            } else {
                $scope.alerts = $scope.alerts.concat(alerts);
            }
        };

        $scope.updateGuest = function (updatedGuest) {
            var alerts = validateGuest(updatedGuest),
                guestId;

            if (updatedGuest && alerts.length === 0) {
                guestId = updatedGuest._id;

                GuestServices.update({ id:guestId }, updatedGuest).$promise.then(
                    function success() {
                        angular.forEach($scope.guests, function (guest, index) {
                            if (guest._id === guestId) {
                                $scope.guests[index] = updatedGuest;
                            }
                        })
                    },
                    function error(data) {
                        $scope.alerts.push({msg: data, type: "danger"});
                    }
                );
            } else {
                $scope.alerts = $scope.alerts.concat(alerts);
            }
        };

        $scope.deleteGuest = function (guest) {
            var guestId = guest._id;
            if (guestId) {
                GuestServices.delete({ id:guestId }).$promise.then(
                    function success() {
                    angular.forEach($scope.guests, function (guest, index) {
                        if (guest._id === guestId) {
                            $scope.guests.splice(index, 1);
                        }
                    },
                    function error(data) {
                        $scope.alerts.push({msg: data, type: "danger"});
                    });
                });
            }
        };

        $scope.guests = GuestServices.query();
    }])
});
