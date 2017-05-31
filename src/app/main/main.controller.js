(function () {
	'use strict';
	
	angular
		.module('app')
		.controller('MainController', MainController);
	
	/** @ngInject */
	function MainController($document, $translate, $timeout) {
		var firstLogin = $document[0].cookie.replace(
			/(?:(?:^|.*;\s*)firstLogin\s*\=\s*([^;]*).*$)|^.*$/, '$1'
		);
		var vm = this;
		vm.mouseIn = mouseIn;
		vm.mouseOut = mouseOut;

        vm.services = [
			{
				name: "برندسازی",
				logoOut: "../../assets/images/icon/star-Start.jpg",
				logoAnimateIn: "../../assets/images/icon/star.gif",
				logoIn: "../../assets/images/icon/star-End.jpg",
				logoAnimateOut: "../../assets/images/icon/star-revers.gif",
				id: 1
			},
            {
                name: "محتوای شبکه‌ی اجتماعی",
                logoOut: "../../assets/images/icon/social-Start.jpg",
                logoAnimateIn: "../../assets/images/icon/Network.gif",
                logoIn: "../../assets/images/icon/social-End.jpg",
                logoAnimateOut: "../../assets/images/icon/Network-revers.gif",
                id: 2
            },
            {
                name: "برنامه‌‌سازی",
                awesomeIcon: "fa-product-hunt",
                id: 3
            },
			{
                name: "تیزر تبلیغاتی",
                awesomeIcon: "fa-gears",
                id: 4
            },
			{
                name: "مستند سازی",
                awesomeIcon: "fa-compass",
                id: 5
            }
		];

        vm.services.forEach(function (service) {
            service.icon = service.awesomeIcon ? 4 : 0;
		});

		activate();
		
		function activate() {
			if (!firstLogin) {
				$document[0].cookie = 'firstLogin=true';
				$translate('APP.MESSAGES.WELCOME').then(function (msg) {
					// toastr.info(msg);
				}, function (msg) {
					// toastr.info(msg);
				});
			}
			
		}


		var iconTimeOut = 900;

		function mouseIn(service) {
		    if( service.icon === 4)
		        return;
			console.log('mouse in', service.id);
			var src = service.logoAnimateIn;
            var $img = $('#icon-' + service.id + '-1');
            var timeout = 0; // no delay
            $timeout(function() {
                $img.attr('src', src);
            }, timeout);
            service.icon = 1;
            $timeout(function () {
                service.icon = 2;
            }, iconTimeOut);

		}

		function mouseOut(service) {
            if( service.icon === 4)
                return;
			console.log('mouse out', service.id);
            var src = service.logoAnimateOut;
            var $img = $('#icon-' + service.id + '-2');
            var timeout = 0; // no delay
            $timeout(function() {
                $img.attr('src', src);
            }, timeout);
            service.icon = 3;
            $timeout(function () {
                service.icon = 0;
            }, iconTimeOut);
		}
	}
})();
