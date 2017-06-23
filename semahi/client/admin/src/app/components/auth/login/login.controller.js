(function () {
	'use strict';
	
	angular
		.module('auth')
		.controller('LoginController', LoginController);
	
	/** @ngInject */
    function LoginController($log, $http, $state, host, $mdToast) {
		var vm = this;
		vm.title = 'LoginController';
		vm.host = host;
		vm.login = login;
        var alert;
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
                $mdToast.show($mdToast.simple()
					.position('top right')
					.toastClass('b-success')
					.textContent('Login successful.')
					.hideDelay(5000)
                );
                $state.go('home.dashboard');
            }, function (error) {
                console.log(error);
				if(error.data)
                    console.log('error', error.data.message);
                $mdToast.show($mdToast.simple()
                    .position('top right')
                    .toastClass('b-error')
                    .textContent('Login failed.')
                    .hideDelay(5000)
                );
                vm.loading = false;
			});
		}
		
	}
	
})();
