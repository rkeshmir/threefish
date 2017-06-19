(function () {
	'use strict';
	
	angular
		.module('app')
		.controller('HomeController', HomeController);
	
	/** @ngInject */
	function HomeController($log, homeService) {
		var vm = this;
		vm.title = 'HomeController';
		vm.dashboard = {};
		activate();
		
		////////////////
		
		function activate() {
			$log.debug('Home module activated');
			getDashboard();
		}
		
		function getDashboard() {
			homeService.getDashboard()
				.then(function (dashboard) {
					vm.dashboard = dashboard;
				});
		}
		
	}
	
})();