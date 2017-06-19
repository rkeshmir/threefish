/**
 * Created by reza on 11/14/16.
 */

(function () {
	'use strict';
	
	angular
		.module('app')
		.config(routeConfig);
	
	/** @ngInject */
	function routeConfig($stateProvider) {
		$stateProvider
			.state('root.ad', {
				controller: 'AdController',
				controllerAs: 'vm',
				data: {
					roles: [
						"admin"
					]
				},
				resolve: {},
				templateUrl: 'app/components/ad/list-ad.html',
				url: '/ad'
			})
			.state('root.createUpdateAd', {
				controller: 'CreateUpdateAdController',
				controllerAs: 'vm',
				data: {
					roles: [
						"admin"
					]
				},
				resolve: {},
				templateUrl: 'app/components/ad/create-update-ad.html',
				url: '/ad/:method/:id'
			})
		
		;
	}
	
})();
