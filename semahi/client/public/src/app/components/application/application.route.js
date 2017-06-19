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
            .state('root.application', {
				controller: 'ApplicationController',
				controllerAs: 'vm',
				data: {
					roles: [
						"admin"
					]
				},
				resolve: {},
                templateUrl: 'app/components/application/list-application.html',
                url: '/application'
            })
            .state('root.createUpdateApplication', {
                controller: 'CreateUpdateApplicationController',
                controllerAs: 'vm',
                data: {
                    roles: [
                        "admin"
                    ]
                },
                resolve: {},
                templateUrl: 'app/components/application/create-update-application.html',
                url: '/application/:method/:id'
			})
		
		;
	}
	
})();
