(function () {
	'use strict';
	
	angular
		.module('app')
		.controller('CreateUpdateAdController', CreateUpdateAdController);
	
	/** @ngInject */
    function CreateUpdateAdController($log, $timeout, adService, userService, $stateParams, toastr,
                                      $state, $filter, host, $window) {
		var vm = this;
		vm.title = 'CreateUpdateAdController';
		vm.method = $stateParams.method;
		vm.ad = {
			id: $stateParams.id
		};

        vm.bounds = {
            left: 0,
            right: 20,
            top: 0,
            bottom: 20
        };
        vm.cropperWidth = $window.innerWidth * 0.4;

        vm.host = host;
		vm.save = save;
		vm.reset = reset;
		vm.date = new Date();
		activate();
		
		////////////////
		
		function activate() {
			$log.debug('Ad module activated');
			getAd();
            getUsers();
		}
		
		function save() {
            var ad = angular.copy(vm.ad);
            ad.fromDate = $filter('sDate')(vm.ad.fromDate);
            ad.toDate = $filter('sDate')(vm.ad.toDate);
            ad.username = vm.ad.user.username;
            console.log('save');
			switch (vm.method) {
				case 'create':
                    adService.createAd(ad, vm.cropper.croppedImage)
						.then(function (data) {
							$timeout(function () {
								$state.go('root.ad');
							}, 3000);
							toastr.success('تبلیغات با موفقیت افزوده شد.');
						}, function () {
							toastr.error('خطا در ایجاد تبلیغات!');
						});
					break;
				case 'update':
					console.log('save ', vm.ad);
					var croppedImage = vm.cropper ? vm.cropper.croppedImage : null;
                    adService.updateAd(vm.ad.id, ad, croppedImage)
                        .then(function (response) {
                            getAd(response.data);
							toastr.success('تبلیغات با موفقیت ویرایش شد.');
							vm.date = new Date();
							vm.cropper = null;
						}, function () {
							toastr.error('خطا در ویرایش تبلیغات!');
						});
					break;
			}
		}
		
		
		function reset() {
			switch (vm.method) {
				case 'create':
					vm.ad = {};
					break;
				case 'update':
					getAd();
			}
		}

        function getAd(ad) {
            if (ad) {
                loadAd(ad);
            }
            else if (vm.ad.id) {
				adService.getAd(vm.ad.id).then(function (data) {
                    loadAd(data)
				});
			}

            function loadAd(advertisement) {
                vm.ad = advertisement;
                vm.ad.label = advertisement.picture.label;
            }
		}

        function getUsers() {
            userService.getAllUsers().then(function (data) {
                vm.users = data;
            }, function () {
                toastr.error('خطا در بارگذاری لیست کاربران!')
            });
        }
		
	}
	
})();