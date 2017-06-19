(function () {
	'use strict';
	
	angular
		.module('app')
		.config(routeConfig);
	
	/** @ngInject */
	function routeConfig($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('root', {
				abstract: true,
				controller: 'MainController',
				controllerAs: 'vm',
				templateUrl: 'app/main/main.html'
			})
			.state('root.home', {
				controller: 'HomeController',
				controllerAs: 'vm',
				data: {
					roles: []
				},
				resolve: {},
				templateUrl: 'app/components/home/home.html',
				url: '/'
			})
		
		;
		$urlRouterProvider.otherwise('/');
	}
	
})();
