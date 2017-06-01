(function () {
	'use strict';
	
	angular
		.module('app')
		.run(runBlock);
	
	/** @ngInject */
    function runBlock($log, $confirmModalDefaults, $http, $window, $rootScope, ngTableDefaults, principal, $mdMedia) {

        principal.identity().then(function (data) {
            $rootScope.currentUser = data;
        });

        $rootScope.mdMedia = $mdMedia;
        $rootScope.showNav = false;
        $rootScope.hideNav = function () {
            if($rootScope.showNav){
                $rootScope.showNav = false;
            }
        };
		//set confirm default
		$confirmModalDefaults.templateUrl = 'app/directives/confirm/confirm-tpl.html';
		$confirmModalDefaults.defaultLabels.title = '';
		$confirmModalDefaults.defaultLabels.ok = 'بله';
		$confirmModalDefaults.defaultLabels.cancel = 'خیر';
		$confirmModalDefaults.size = 'sm';
		
		//ng-table default
		ngTableDefaults.params.count = 20;
		ngTableDefaults.settings.counts = [10, 20, 40, 60, 80, 100];
		ngTableDefaults.settings.paginationMaxBlocks = 5;
		ngTableDefaults.settings.paginationMinBlocks = 2;
		
		var startStateChange = $rootScope.$on('$stateChangeStart', stateChangeStart);
		var successStateChange = $rootScope.$on('$stateChangeSuccess', stateChangeSuccess);
		
		$log.debug('runBlock end');
		
		$rootScope.$on('$destroy', destroy);
		
		function destroy() {
			startStateChange();
			successStateChange();
		}
		
		function stateChangeStart(event, toState) {
			/*$http.pendingRequests.forEach(function (request) {
			 if (request.cancel && request.url.indexOf('/data/lang/') === -1) {
			 request.cancel.resolve();
			 }
			 });*/
			$log.info('$stateChangeStart:', toState.name);
			if (toState.name !== 'login') {
				principal.authorize();
			}
			
		}
		
		/** @ngInject */
		function stateChangeSuccess() {
			$log.info('$stateChangeSuccess;');
			$window.scrollTo(0, 0);
		}
		
	}
	
})();
