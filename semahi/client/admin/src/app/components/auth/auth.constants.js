/* global moment:false; */
(function () {
	'use strict';
    var location = window.location;
    var serverPort = '8080';
    console.log(location);
	angular
		.module('auth')
		.constant('moment', moment)
        .constant('host', 'http://' + location.hostname + ':' + serverPort + '/')
		.constant('emailRegex', /^[_A-Za-z0-9]+(\.[_A-Za-z0-9]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,4})$/)
	;
	
})();
