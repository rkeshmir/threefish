(function () {
	
	'use strict';
	
	/**
	 * @ngdoc directive
	 * @name app.directive:sidebar
	 * @description
	 * # sidebar
	 */
	
	angular
		.module('app')
		.directive('sidebar', sidebar);
	
	/** @ngInject */
	function sidebar() {
		return {
			templateUrl: 'app/main/sidebar/sidebar.html',
			restrict: 'E',
			replace: true,
			controller: SidebarCtrl,
			controllerAs: 'vm',
			bindToController: true // because the scope is isolated
		};
		
		/** @ngInject */
		function SidebarCtrl(sidebarService, $log, principal) {
			/* jshint validthis: true */
			var vm = this;
			vm.selectedMenu = 'dashboard';
			vm.collapseVar = 0;
			vm.multiCollapseVar = 0;
			var user = principal.getIdentity();
			$log.info('sidebar.user:    ', user);
			vm.check = check;
			vm.multiCheck = multiCheck;
			vm.hasAccess = hasAccess;
			
			activate();
			
			function activate() {
				$log.debug('sidebar.user activated');
				sidebarService.getSidebar().then(
					function (data) {
						vm.data = data;
					}
				);
			}
			
			function check(x) {
				if (x === vm.collapseVar) {
					vm.collapseVar = 0;
				}
				else {
					vm.collapseVar = x;
				}
			}
			
			function multiCheck(y) {
				if (y === vm.multiCollapseVar) {
					vm.multiCollapseVar = 0;
				}
				else {
					vm.multiCollapseVar = y;
				}
			}
			
			function hasAccess(authorities) {
				if (!authorities || !authorities.length) {
					return true;
				}
				else if (!user.authorities || !user.authorities.length) {
					return false;
				}
				for (var i = 0; i < authorities.length; i++) {
					for (var j = 0; j < user.authorities.length; j++) {
						if (authorities[i] === user.authorities[j].authority) {
							return true;
						}
					}
				}
				return false;
			}
			
		}
	}
})();
