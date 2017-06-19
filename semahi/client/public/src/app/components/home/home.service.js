(function () {
	'use strict';
	
	angular
		.module('app')
		.factory('homeService', homeService);
	
	/** @ngInject */
	function homeService($log, $http, host) {
		var base = host + 'dashboard/';
		var service = {
			getDashboard: getDashboard
		};
		return service;
		
		////////////////
		
		function getDashboard(params) {
			$log.info('homeService called');
			return $http.get(base, {params: params})
				.then(successCallback);
		}
		
		function successCallback(response) {
			return response.data;
		}
		
	}
	
})();