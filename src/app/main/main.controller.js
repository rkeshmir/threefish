(function () {
	'use strict';
	
	angular
		.module('app')
		.controller('MainController', MainController);
	
	/** @ngInject */
	function MainController($document, $translate, toastr) {
		var firstLogin = $document[0].cookie.replace(
			/(?:(?:^|.*;\s*)firstLogin\s*\=\s*([^;]*).*$)|^.*$/, '$1'
		);
		var vm = this;
		vm.mouseIn = mouseIn;
		vm.mouseOut = mouseOut;
		vm.icon = {
			"star": 1
		};
		activate();
		
		function activate() {
			if (!firstLogin) {
				$document[0].cookie = 'firstLogin=true';
				$translate('APP.MESSAGES.WELCOME').then(function (msg) {
					// toastr.info(msg);
				}, function (msg) {
					// toastr.info(msg);
				});
			}
			
		}

		function mouseIn() {
			console.log('mouse in');
			vm.icon['star'] = 2;
		}

		function mouseOut() {
			console.log('mouse out');
			vm.icon['star'] = 1;
		}
	}
})();
