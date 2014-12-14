'use strict';

define(['angular', 'services'], function (angular) {

	/* Controllers */
	
	return angular.module('weddingTime.controllers', ['weddingTime.services'])
		// Sample controller where service is being used
		.controller('GuestListController',
            function ($scope, $http, guests) {
                $scope.guests = [];
                $scope.alerts = [];

                $scope.closeAlert = function(index) {
                    $scope.alerts.splice(index, 1);
                };

                function validateGuest(guestObj) {
                    var alerts = [];

                    angular.forEach($scope.guests, function(guest) {
                        if(guest.rsvpCode === guestObj.rsvpCode) {
                            alerts.push({
                                msg: "RSVP Code must be unique",
                                type: "danger"
                            });
                        }
                    });

                    return alerts;
                }

                $scope.addGuest = function(newGuest) {
                    var alerts = validateGuest(newGuest);

                    if(newGuest && alerts.length === 0) {
                        $http.post("/api/v1/guests", newGuest)
                            .error(function(data) {
                                $scope.alerts.push({msg: data, type: "danger"});
                            })
                            .success(function(id) {
                                newGuest._id = id;
                                $scope.guests.push(newGuest);
                            });
                    } else {
                        $scope.alerts = $scope.alerts.concat(alerts);
                    }
                };

                $scope.updateGuest = function(updatedGuest) {
                    var alerts = validateGuest(updatedGuest),
                        id;

                    if(updatedGuest && alerts.length === 0) {
                        id = updatedGuest._id;

                        $http.put("/api/v1/guests/" + id, updatedGuest)
                            .error(function(data) {
                                $scope.alerts.push({msg: data, type: "danger"});
                            })
                            .success(function() {
                                angular.forEach($scope.guests, function(guest, index) {
                                    if(guest._id === id) {
                                        $scope.guests[index] = updatedGuest;
                                    }
                                });
                            });
                    } else {
                        $scope.alerts = $scope.alerts.concat(alerts);
                    }
                };

                $scope.deleteGuest = function(id) {
                    if(id) {
                        $http.delete("/api/v1/guests/" + id)
                            .error(function(data) {
                                $scope.alerts.push({msg: data, type: "danger"});
                            })
                            .success(function() {
                                angular.forEach($scope.guests, function(guest, index) {
                                    if(guest._id === id) {
                                        $scope.guests.splice(index, 1);
                                    }
                                });
                            });
                    }
                };

                guests().then(function(result) {
                    $scope.guests = result.data;
                });
		    }
        );
});
