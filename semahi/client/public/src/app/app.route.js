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
				.state('root.team', {
					controller: 'TeamController',
					controllerAs: 'vm',
					data: {
						roles: []
					},
					resolve: {},
					templateUrl: 'app/components/team/team.html',
					url: '/team'
				})
				.state('root.blog', {
					controller: 'BlogController',
					controllerAs: 'vm',
					data: {
						roles: []
					},
					resolve: {},
					templateUrl: 'app/components/blog/blog.html',
					url: '/blog'
			})
		
		;
		$urlRouterProvider.otherwise('/');
	}
	
})();
