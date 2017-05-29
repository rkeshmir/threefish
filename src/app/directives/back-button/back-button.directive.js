(function () {
	'use strict';
	
	angular
		.module('app')
		.directive('backButton', backButton);
	
	/** @ngInject */
	function backButton() {
		var directive = {
			link: link,
			replace: true,
			restrict: 'E',
			templateUrl: 'app/directives/back-button/back-button.html'
		};
		return directive;
		
		function link(scope, element) {
			element.bind('click', goBack);
			function goBack() {
				history.back();
				scope.$apply();
			}
		}
	}
	
})();

