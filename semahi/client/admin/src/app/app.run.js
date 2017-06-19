(function () {
	'use strict';
	
	angular
		.module('app')
		.run(runBlock);
	
	/** @ngInject */
    function runBlock($log, $window, $rootScope, principal, $transitions) {

        principal.identity().then(function (data) {
            console.log('loggedin');
            $rootScope.currentUser = data;
        }, function (error) {
            console.log('not logged in');
        });




		$log.debug('runBlock end');


        $transitions.onStart({to: '**'}, function (trans) {
            console.log('stateChangeStart:', trans.$to());
            if (trans.$to().name !== 'login') {
                principal.authorize();
            }
        });

        $transitions.onSuccess({to: '**'}, function (trans) {
            console.log('sstateChangeSuccess;');
            $window.scrollTo(0, 0);
        });
		

		
	}
	
})();
