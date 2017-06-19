(function () {
	'use strict';
	
	angular
		.module('auth')
		.controller('RegisterController', RegisterController);
	
	/** @ngInject */
	function RegisterController($log) {
		var vm = this;
		vm.title = 'RegisterController';
		
		activate();
		
		////////////////
		
		function activate() {
			$log.info('register module ativated.');
		}
	}
	
})();
