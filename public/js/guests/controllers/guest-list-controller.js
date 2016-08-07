'use strict';

function GuestListController($scope, GuestServices) {
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
                alerts.push({msg: 'RSVP Code must be unique', type: 'danger'});
            }
        });

        return alerts;
    }

    function updateNumberInvited(guestObj) {
        var guestCount = guestObj.guestAllowed ? 1 : 0;

        guestObj.numberInvited = guestCount + guestObj.namesInvited.length;
    }

    $scope.addGuest = function (newGuest) {
        var alerts = validateGuest(newGuest);
        newGuest.rsvpd = false;

        updateNumberInvited(newGuest);

        if (newGuest && alerts.length === 0) {
            GuestServices.save(newGuest).$promise.then(
                function success(data) {
                    newGuest._id = data.id;
                    $scope.guests.push(newGuest);
                },
                function error(data) {
                    $scope.alerts.push({msg: data, type: 'danger'});
                }
            );
        } else {
            $scope.alerts = $scope.alerts.concat(alerts);
        }
    };

    $scope.updateGuest = function (updatedGuest) {
        var alerts = validateGuest(updatedGuest),
            guestId;

        updateNumberInvited(updatedGuest);

        if (updatedGuest && alerts.length === 0) {
            guestId = updatedGuest._id;

            GuestServices.update({id: guestId}, updatedGuest).$promise.then(
                function success() {
                    angular.forEach($scope.guests, function (guest, index) {
                        if (guest._id === guestId) {
                            $scope.guests[index] = updatedGuest;
                        }
                    });
                },
                function error(data) {
                    $scope.alerts.push({msg: data, type: 'danger'});
                }
            );
        } else {
            $scope.alerts = $scope.alerts.concat(alerts);
        }
    };

    $scope.deleteGuest = function (guest) {
        var guestId = guest._id;
        if (guestId) {
            GuestServices.delete({id: guestId}).$promise.then(
                function success() {
                    angular.forEach($scope.guests, function (guest, index) {
                        if (guest._id === guestId) {
                            $scope.guests.splice(index, 1);
                        }
                    });
                },
                function error(data) {
                    $scope.alerts.push({msg: data, type: 'danger'});
                }
            );
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
    };

    $scope.isActive = function (title) {
        return title === $scope.activeTab;
    };

    $scope.isActiveGroup = function(title) {
        return title === $scope.groupFilter.group;
    };

    $scope.setActiveGroup = function(title) {
        $scope.groupFilter = { group: title };
    };

    $scope.hasRsvpd = function () {
        return $scope.isActive('Attending') || $scope.isActive('Not Attending');
    };

    $scope.attending = function () {
        return $scope.isActive('Attending');
    };

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
        filter: {rsvpd: false}
    }];
}

module.exports = ['$scope', require('../namespace') + '.GuestServices', GuestListController];
