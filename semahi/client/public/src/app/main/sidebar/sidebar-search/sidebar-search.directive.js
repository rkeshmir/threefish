(function () {
	
	'use strict';
	
	/**
	 * @ngdoc directive
	 * @name atm.directive:sidebarSearch
	 * @description
	 * # sidebarSearch
	 */
	
	angular
		.module('app')
		.directive('sidebarSearch', sidebarSearch);
	
	/** @ngInject */
	function sidebarSearch() {
		return {
			templateUrl: 'app/main/sidebar/sidebar-search/sidebar-search.html',
			restrict: 'E',
			replace: true,
			scope: {
				query: '='
			},
			controller: SidebarSearchCtrl,
			controllerAs: 'vm',
			bindToController: true // because the scope is isolated
		};
		
	}
	
	/** @ngInject */
	function SidebarSearchCtrl() {
		/* jshint validthis: true */
		// var vm = this;
	}
	
})();
