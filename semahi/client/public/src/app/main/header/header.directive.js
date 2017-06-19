(function () {
	
	'use strict';
	
	/**
	 * @ngdoc directive
	 * @name app.directive:samatHeader
	 * @description
	 * # samatHeader
	 */
	angular
		.module('app')
		.directive('samatHeader', samatHeader);
	
	/** @ngInject */
	function samatHeader() {
		return {
			templateUrl: 'app/main/header/header.html',
			restrict: 'E',
            replace: true,
            controller: headerController,
            controllerAs: 'headerVm'
		};
	}

    /** @ngInject */
    function headerController($rootScope) {
        var headerVm = this;
        headerVm.toggleNav = toggleNav;

        function toggleNav() {
            console.log('toggleNav', $rootScope.showNav);
            $rootScope.showNav = !$rootScope.showNav;
        }
    }
})();


