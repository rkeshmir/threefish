(function () {
	'use strict';
	
	angular
		.module('auth')
		.config(routeConfig);
	
	/** @ngInject */
	function routeConfig($stateProvider) {
		$stateProvider
			.state('login', {
				controller: 'LoginController',
				controllerAs: 'vm',
				templateUrl: 'app/components/auth/login/login.html',
				url: '/login'
			})
			.state('register', {
				controller: 'RegisterController',
				controllerAs: 'vm',
				templateUrl: 'app/components/auth/register/register.html',
				url: '/register'
			})
			.state('forgetPass', {
				controller: 'ForgetPassController',
				controllerAs: 'vm',
				templateUrl: 'app/components/auth/forget-pass/forget-pass.html',
				url: '/forget-pass'
			})
			.state('resetPass', {
				controller: 'ResetPassController',
				controllerAs: 'vm',
				templateUrl: 'app/components/auth/reset-pass/reset-pass.html',
				url: '/reset-pass'
			})
			
			//errors states
			.state('unauthorized', {
				url: '/401',
				templateUrl: 'app/components/auth/errors/401.html'
			})
			.state('notFound', {
				url: '/404',
				templateUrl: 'app/components/auth/errors/404.html'
			})
			.state('internalServerError', {
				url: '/500',
				templateUrl: 'app/components/auth/errors/500.html'
			})
		
		;
	}
	
})();
