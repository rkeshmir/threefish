(function () {
	'use strict';
	
	angular
		.module('app')
		.directive('commandButtons', commandButtons);
	
	/** @ngInject */
	function commandButtons() {
		var directive = {
			bindToController: true,
			controller: ButtonsController,
			controllerAs: 'vm',
			restrict: 'E',
			scope: {
				cancel: '&?',
				delete: '&?',
				disabled: '=?',
				edit: '&?',
				toggle: '=?'
			},
			templateUrl: 'app/directives/ng-table/command-buttons.html'
		};
		return directive;
		
	}
	
	/** @ngInject */
	function ButtonsController() {
		/* jshint validthis: true */
		var vm = this;
		vm.toggled = toggled;
		
		function toggled() {
			vm.toggle = !vm.toggle;
		}
	}
	
})();