(function () {
    'use strict';

    angular
        .module('app')
        .controller('CreateUpdateBannerController', CreateUpdateBannerController);

    /** @ngInject */
    function CreateUpdateBannerController($log, $timeout, bannerService, $stateParams, toastr, $state,
                                          $window, host) {
        var vm = this;
        vm.title = 'CreateUpdateBannerController';
        vm.host = host;
        vm.method = $stateParams.method;
        vm.banner = {
            id: $stateParams.id
        };

        vm.bounds = {
            left: 0,
            right: 20,
            top: 0,
            bottom: 20
        };
        vm.cropperWidth = $window.innerWidth * 0.4;
        vm.save = save;
        vm.reset = reset;
        vm.getRatioDiff = getRatioDiff;
        vm.date = new Date();
        activate();

        ////////////////

        function activate() {
            $log.debug('Banner module activated');
            getBanner();
        }

        function save() {
            vm.loading = true;
            switch (vm.method) {
                case 'create':
                    bannerService.createBanner(vm.banner.label, vm.cropper.croppedImage)
                        .then(function (data) {
                            $timeout(function () {
                                vm.loading = false;
                                $state.go('root.banner');
                            }, 3000);
                            toastr.success('بنر با موفقیت افزوده شد.');
                        }, function () {
                            vm.loading = false;
                            toastr.error('خطا در ایجاد بنر!');
                        });
                    break;
                case 'update':
                    var croppedImage = vm.cropper ? vm.cropper.croppedImage : null;
                    bannerService.updateBanner(vm.banner.id, vm.banner.name, croppedImage)
                        .then(function (data) {
                            vm.loading = false;
                            vm.banner = data;
                            toastr.success('بنر با موفقیت ویرایش شد.');
                            vm.date = new Date();
                            vm.cropper = null;
                        }, function () {
                            vm.loading = false;
                            toastr.error('خطا در ویرایش بنر!');
                        });
                    break;
            }
        }


        function reset() {
            switch (vm.method) {
                case 'create':
                    vm.banner = {};
                    break;
                case 'update':
                    getBanner();
            }
        }

        function getBanner() {
            if (vm.banner.id) {
                vm.loading = true;
                bannerService.getBanner(vm.banner.id).then(function (data) {
                    vm.loading = false;
                    vm.banner = data;
                });
            }
        }

        function getRatioDiff() {
            return Math.abs((vm.bounds.right - vm.bounds.left) / (vm.bounds.top - vm.bounds.bottom) - (880 / 300));
        }

    }

})();