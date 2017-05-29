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
            .state('root.category', {
				controller: 'CategoryController',
				controllerAs: 'vm',
				data: {
					roles: [
						"admin"
					]
				},
				resolve: {},
                templateUrl: 'app/components/category/list-category.html',
                url: '/category'
            })
            .state('root.createUpdateCategory', {
                controller: 'CreateUpdateCategoryController',
                controllerAs: 'vm',
                data: {
                    roles: [
                        "admin"
                    ]
                },
                resolve: {},
                templateUrl: 'app/components/category/create-update-category.html',
                url: '/category/:method/:id'
			})
		
		;
	}
	
})();
