define(['angular'], function (angular) {
    'use strict';

	angular.module("weddingTime.filters", [])
		.filter('interpolate', ['version', function(version) {
			return function(text) {
				return String(text).replace(/\%VERSION\%/mg, version);
			};
	}]);
});
