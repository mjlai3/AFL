'use strict';

angular.module('app.directives')

.directive('statBox', function() {
	return {
		restrict: 'E',
		scope: {
			heading: '@',
			stats: '=',
			statType: '@',
			class: '@'
		},
		replace: true,
		templateUrl: './views/statBox.html'
	}
});