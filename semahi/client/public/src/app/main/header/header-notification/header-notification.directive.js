(function () {
	'use strict';
	
	/**
	 * @ngdoc directive
	 * @name app.directive:headerNotification
	 * @description
	 * # headerNotification
	 */
	
	angular
		.module('app')
		.directive('headerNotification', headerNotification);
	
	/** @ngInject */
	function headerNotification() {
		return {
			bindToController: true,
			controller: headerCtrl,
			controllerAs: 'vm',
			templateUrl: 'app/main/header/header-notification/header-notification.html',
			restrict: 'E',
			replace: true,
			scope: {}
		};
	}
	
	/** @ngInject */
	function headerCtrl($translate, host, principal) {
		var vm = this;
		vm.host = host;
		vm.Languages = [
			{
				key: 'fa_IR',
				title: 'APP.LANG.FA_IR'
			},
			{
				key: 'en_US',
				title: 'APP.LANG.EN_US'
			}
		];
		vm.user = principal.getIdentity();
		vm.logout = logout;
		
		vm.changeLanguage = changeLanguage;
		
		function changeLanguage(langKey) {
			$translate.use(langKey);
		}
		
		function logout() {
			principal.logout();
		}
		
	}
	
})();