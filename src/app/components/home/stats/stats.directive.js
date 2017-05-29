(function () {
	'use strict';
	
	/**
	 * @ngdoc directive
	 * @name app.directive:samatStats
	 * @description
	 * # samatStats
	 */
	angular
		.module('app')
		.directive('samatStats', samatStats);
	
	/** @ngInject */
	function samatStats() {
		return {
			templateUrl: 'app/components/home/stats/stats.html',
			restrict: 'E',
			replace: true,
			scope: {
				'color': '@',
				'comments': '@',
				'details': '@',
				'icon': '@',
				'model': '=',
				'name': '@',
				'number': '@',
				'title': '@',
				'goto': '@'
			}
		};
	}
})();
