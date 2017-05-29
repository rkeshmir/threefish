(function () {
	'use strict';
	
	angular
		.module('auth')
		.factory('authInterceptor', authInterceptor);
	
	/** @ngInject */
	function authInterceptor($log, $q, $window) {
		var Authentication = {
			request: onRequest,
			response: onResponse,
			responseError: onResponseError
		};
		
		return Authentication;
		
		////////////////
		
		function onRequest(config) {
			var deferred = $q.defer();
			// promise that should abort the request when resolved.
			config.timeout = deferred.promise;
			config.cancel = deferred;
			return config;
		}
		
		function onResponse(response) {
			return response || $q.when(response);
		}
		
		function onResponseError(response) {
			if (response.status === 401) {
				// user is not authenticated
				$log.error('user is not authenticated', response);
				$window.location.href = '/#/login';
			}
			if (response.status === 403) {
				// user is not authenticated
				$log.warn('operation forbidden', response);
			}
			
			// if (response.status === 404) {
			//     $log.error('request is not found', response);
			//     $window.location.href = '/#/404';
			// }
			
			return $q.reject(response);
		}
		
	}
	
})();
