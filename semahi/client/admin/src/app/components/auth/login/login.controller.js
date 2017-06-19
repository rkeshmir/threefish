(function () {
	'use strict';
	
	angular
		.module('auth')
		.controller('LoginController', LoginController);
	
	/** @ngInject */
    function LoginController($log, $http, $state, host, util) {
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
			vm.loading = true;
			var url = host + 'login';
			$http({
				method: 'POST',
				url: url,
				withCredentials: true,
				data: "username=" + vm.username + '&password=' + vm.password,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function () {
				$log.debug('login successful');
                $state.go('home.dashboard');
            }, function (error) {
                console.log(error);
				if(error.data)
                    console.log('error', error.data.message);
                vm.loading = false;
			});
		}
		
	}
	
})();
