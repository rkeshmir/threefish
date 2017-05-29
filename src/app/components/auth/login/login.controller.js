(function () {
	'use strict';
	
	angular
		.module('auth')
		.controller('LoginController', LoginController);
	
	/** @ngInject */
	function LoginController($log, $http, $state, host, toastr) {
		var vm = this;
		vm.title = 'LoginController';
		vm.host = host;
		vm.login = login;
		activate();
		
		////////////////
		
		function activate() {
			$log.info('login module activated.');
		}
		
		function login() {
			var url = host + 'login';
			$http({
				method: 'POST',
				url: url,
				withCredentials: true,
				data: "username=" + vm.username + '&password=' + vm.password,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function () {
				$log.debug('login successful');
				$state.go('root.home');
			}, function () {
				toastr.error('نام کاربری یا گذرواژه نادرست است.')
			});
		}
		
	}
	
})();
