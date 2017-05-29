(function () {
	
	'use strict';
	
	/**
	 * @ngdoc directive
	 * @name app.directive:samatFooter
	 * @description
	 * # samatFooter
	 */
	angular
		.module('app')
		.directive('samatFooter', samatFooter);
	
	/** @ngInject */
	function samatFooter() {
		return {
			templateUrl: 'app/main/footer/footer.html',
			restrict: 'E',
			replace: true
		};
	}
	
})();