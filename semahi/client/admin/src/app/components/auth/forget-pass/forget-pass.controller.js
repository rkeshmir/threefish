(function () {
	'use strict';
	
	angular
		.module('auth')
		.controller('ForgetPassController', ForgetPassController);
	
	/** @ngInject */
	function ForgetPassController($log) {
		var vm = this;
		vm.title = 'ForgetPassController';
		
		activate();
		
		////////////////
		
		function activate() {
			$log.debug('forget pass module ativated.');
		}
	}
	
})();
