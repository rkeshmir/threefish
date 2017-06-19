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
            .state('root.user', {
				controller: 'UserController',
				controllerAs: 'vm',
				data: {
					roles: [
						"admin"
					]
				},
				resolve: {},
                templateUrl: 'app/components/user/list-user.html',
                url: '/user'
            })
            .state('root.createUpdateUser', {
                controller: 'CreateUpdateUserController',
                controllerAs: 'vm',
                data: {
                    roles: [
                        "admin"
                    ]
                },
                resolve: {},
                templateUrl: 'app/components/user/create-update-user.html',
                url: '/user/:method/:username'
			})
		
		;
	}
	
})();
