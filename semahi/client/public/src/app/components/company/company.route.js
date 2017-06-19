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
            .state('root.company', {
				controller: 'CompanyController',
				controllerAs: 'vm',
				data: {
					roles: [
						"admin"
					]
				},
				resolve: {},
                templateUrl: 'app/components/company/list-company.html',
                url: '/company'
            })
            .state('root.createUpdateCompany', {
                controller: 'CreateUpdateCompanyController',
                controllerAs: 'vm',
                data: {
                    roles: [
                        "admin"
                    ]
                },
                resolve: {},
                templateUrl: 'app/components/company/create-update-company.html',
                url: '/company/:method/:id'
			})
		
		;
	}
	
})();
