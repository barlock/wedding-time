'use strict';

define(["angular", "services"], function(angular, services) {

	/* Directives */
	
	angular.module('weddingTime.directives', ['weddingTime.services'])
        .directive("guestForm", function() {
            return {
                transclude: false,
                restrict: "A",
                scope: {
                    onSubmit: "=",
                    submitTest: "=",
                    guest: "="
                },
                link:function(scope, element) {
                    element.on("click",function (event) {
                        event.preventDefault();
                        scope.open();
                    });
                },
                /* jshint -W072 */
                controller: function ($scope, $modal) {
                    /* jshint +W072 */
                    var modalInstance,
                        formData = $scope.guest || {};

                    $scope.alerts = [];

                    // register listener for initial validation
                    $scope.open = function() {
                        $scope.formData = angular.copy(formData);

                        if(!$scope.formData.numberInvited) {
                            $scope.formData.numberInvited = 1;
                        }

                        if(!$scope.formData.group) {
                            $scope.formData.group = "Liz";
                        }

                        $scope.alerts = [];

                        modalInstance = $modal.open({
                            templateUrl: "/templates/guest-form.html",
                            scope: $scope
                        });

                        modalInstance.result.then(function (guest) {
                            $scope.onSubmit(guest);
                        });
                    };

                    $scope.update = function () {
                        modalInstance.close($scope.formData);
                    };
                }
            };
        });
});
