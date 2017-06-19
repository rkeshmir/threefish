(function () {
	'use strict';
	
	angular
		.module('app')
		.directive('fileUpload', fileUpload);
	
	/** @ngInject */
	function fileUpload() {
		var directive = {
			restrict: 'E',
			scope: {
				accept: '@',
				file: '=',
				label: '@',
				uploading: '='
			},
			templateUrl: 'app/directives/file-upload/file-upload.html'
		};
		return directive;
	}
	
})();
