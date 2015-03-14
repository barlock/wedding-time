define([
    '../module',
    '../namespace',
], function (module, namespace) {
    'use strict';

    var name = namespace + ".GuestListController";

    module.controller(name, ['$scope', namespace + '.GuestServices', function ($scope, GuestServices) {
        $scope.guests = [];
        $scope.alerts = [];
        $scope.guestFilter = {};
        $scope.groupFilter = {};

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
            newGuest.rsvpd = false;

            if (newGuest && alerts.length === 0) {
                GuestServices.save(newGuest, function () {
                    $scope.guests.push(newGuest);
                });
            } else {
                $scope.alerts = $scope.alerts.concat(alerts);
            }
        };

        $scope.updateGuest = function (updatedGuest) {
            var alerts = validateGuest(updatedGuest),
                guestId;

            if (updatedGuest && alerts.length === 0) {
                guestId = updatedGuest._id;

                GuestServices.update({id: guestId}, updatedGuest, function () {
                    angular.forEach($scope.guests, function (guest, index) {
                        if (guest._id === guestId) {
                            $scope.guests[index] = updatedGuest;
                        }
                    });
                });
            } else {
                $scope.alerts = $scope.alerts.concat(alerts);
            }
        };

        $scope.deleteGuest = function (guest) {
            var guestId = guest._id;
            if (guestId) {
                GuestServices.delete({id: guestId}, function () {
                    angular.forEach($scope.guests, function (guest, index) {
                        if (guest._id === guestId) {
                            $scope.guests.splice(index, 1);
                        }
                    });
                });
            }
        };

        $scope.attendingGreaterThan = function (value) {
            return function (item) {
                return item.numberComing > value;
            };
        };

        $scope.attendingEquals = function (value) {
            return function (item) {
                return item.numberComing === value;
            };
        };

        $scope.setActive = function (tab) {
            $scope.activeTab = tab.title;
            $scope.guestFilter = tab.filter;
        }

        $scope.isActive = function(title) {
            return title == $scope.activeTab;
        }

        $scope.hasRsvpd = function() {
            return $scope.isActive('Attending') || $scope.isActive('Not Attending');
        }

        $scope.attending = function() {
            return $scope.isActive('Attending');
        }

        $scope.guests = GuestServices.query();
        $scope.activeTab = 'All';
        $scope.tabs = [{
            title: 'All',
            filter: {}
        }, {
            title: 'Attending',
            filter: $scope.attendingGreaterThan(0)
        }, {
            title: 'Not Attending',
            filter: $scope.attendingEquals(0)
        }, {
            title: 'Awaiting Response',
            filter: {rsvpd:false}
        }];
    }])
});
