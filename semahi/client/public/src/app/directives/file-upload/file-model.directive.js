(function () {
	'use strict';
	
	angular
		.module('app')
		.directive('fileModel', fileModel);
	
	
	/** @ngInject */
	function fileModel() {
		var directive = {
			link: link,
			restrict: 'A',
			scope: {
				fileModel: '='
			}
		};
		return directive;
		
		function link(scope, element) {
			element.bind('change', change);
			
			function change(event) {
				var file = event.target.files[0];
				scope.fileModel = file ? file : undefined;
				scope.$apply();
			}
			
		}
	}
	
})();

