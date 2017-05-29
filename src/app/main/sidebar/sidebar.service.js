(function () {
	
	'use strict';
	
	/**
	 * @ngdoc service
	 * @name app.service:sidebarService
	 * @description
	 * # sidebarService
	 */
	
	angular
		.module('app')
		.service('sidebarService', sidebarService);
	
	/** @ngInject */
	function sidebarService($http) {
		/* jshint validthis: true */
		this.getSidebar = getSidebar;
		
		//////////
		
		function getSidebar() {
			return $http.get('data/sidebar.json').then(successCallback)
		}
		
		function successCallback(response) {
			return response.data;
		}
	}
})();