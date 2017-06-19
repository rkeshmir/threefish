(function () {
	'use strict';
	
	angular
		.module('app')
		.config(local);
	
	/** @ngInject */
	function local(/*$translateProvider*/) {
		/*$translateProvider.useSanitizeValueStrategy('escape');
		$translateProvider.useStaticFilesLoader({
			prefix: '/data/lang/',
			suffix: '.json'
		});
		
		// add translation table
		$translateProvider
			.preferredLanguage('fa_IR')
			.fallbackLanguage('fa_IR');*/
		
	}
	
})();
