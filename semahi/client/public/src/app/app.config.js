(function () {
	'use strict';
	
	angular
		.module('app')
		.config(config);
	
	/** @ngInject */
	function config($locationProvider, $logProvider, $httpProvider,
	                ADMdtpProvider, moment, toastrConfig) {
		// Enable log
		$logProvider.debugEnabled(true);
		
		//  @desc add $http Interceptor
		// $httpProvider.interceptors.push('authInterceptor');
		$httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
		// disable # in url
		// $locationProvider.html5Mode(true);
		
		/////////////////////////////////
		// Set options third-party lib //
		/////////////////////////////////
		
		ADMdtpProvider.setOptions({
			autoClose: true,
			calType: 'jalali',
			dtpType: 'date',
            format: 'YYYY-MM-DD',
            freezeInput: true
		});
		
		// Set toastr options
		angular.extend(toastrConfig, {
			allowHtml: true,
			closeButton: true,
			closeHtml: '<button class="pull-left">&times;</button>',
			extendedTimeOut: 500,
			positionClass: 'toast-top-right',
            preventDuplicates: false,
			progressBar: true,
			tapToDismiss: true,
            // target: 'body',
			timeOut: 3000
		});
		
		
		//moment
		moment.loadPersian();
		
	}
	
})();
