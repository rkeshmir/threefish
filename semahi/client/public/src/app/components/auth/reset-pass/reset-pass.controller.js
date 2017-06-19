(function () {
	'use strict';
	
	angular
		.module('auth')
		.controller('ResetPassController', ResetPassController);
	
	/** @ngInject */
	function ResetPassController($log) {
		var vm = this;
		vm.title = 'ResetPassController';
		
		activate();
		
		////////////////
		
		function activate() {
			$log.info('reset pass module ativated.');
		}
	}
	
})();
