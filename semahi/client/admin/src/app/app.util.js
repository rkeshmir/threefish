(function () {
	'use strict';
	
	angular
		.module('app')
		.factory('util', util);
	
	/** @ngInject */
	function util($log) {
		
		var service = {
			compareObjects: compareObjects,
			// toast: toast,
			transformRequest: transformRequest
		};
		return service;
		
		////////////////
		
		function compareObjects(object1, object2) {
			return angular.toJson(object1) === angular.toJson(object2);
		}
		
		/*function toast(type, text, title) {
			$translate(text).then(toaster, toaster);
            console.log('toast', type, text, title);
			function toaster(msg) {
                console.log('toaster', msg);
				switch (type) {
					case 'error':
						toastr.error(msg);
						$log.error(title);
						break;
					case 'info':
						toastr.info(msg);
						break;
					case 'success':
						toastr.success(msg);
						break;
					case 'warn':
						toastr.warning(msg);
						$log.warn(title);
						break;
					default:
						toastr.info(msg);
				}
			}
		}*/
		
		function transformRequest(data) {
			var formData = new FormData();
			angular.forEach(data, function (value, key) {
				formData.append(key, value);
			});
			
			return formData;
		}
		
	}
	
})();
