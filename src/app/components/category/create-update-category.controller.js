(function () {
    'use strict';

    angular
        .module('app')
        .controller('CreateUpdateCategoryController', CreateUpdateCategoryController);

    /** @ngInject */
    function CreateUpdateCategoryController($log, $timeout, categoryService, $stateParams, toastr, $state, host) {
        var vm = this;
        vm.title = 'CreateUpdateUserController';
        vm.host = host;
        vm.method = $stateParams.method;
        vm.category = {
            id: $stateParams.id
        };

        vm.save = save;
        vm.reset = reset;
        vm.date = new Date();
        activate();

        ////////////////

        function activate() {
            $log.debug('Category module activated');
            getCategory();
        }

        function save() {

            switch (vm.method) {
                case 'create':
                    categoryService.createCategory(vm.category.name, vm.cropper.croppedImage)
                        .then(function (data) {
                            $timeout(function () {
                                $state.go('root.category');
                            }, 3000);
                            toastr.success('دسته‌بندی با موفقیت افزوده شد.');
                        }, function () {
                            toastr.error('خطا در ایجاد دسته‌بندی!');
                        });
                    break;
                case 'update':
                    console.log('save ', vm.category);
                    var croppedImage = vm.cropper ? vm.cropper.croppedImage : null;
                    categoryService.updateCategory(vm.category.id, vm.category.name, croppedImage)
                        .then(function (data) {
                            vm.category = data;
                            toastr.success('دسته‌بندی با موفقیت ویرایش شد.');
                            vm.date = new Date();
                            vm.cropper = null;
                        }, function () {
                            toastr.error('خطا در ویرایش دسته‌بندی!');
                        });
                    break;
            }
        }



        function reset() {
            switch (vm.method) {
                case 'create':
                    vm.category = {};
                    break;
                case 'update':
                    getCategory();
            }
        }

        function getCategory() {
            if (vm.category.id) {
                categoryService.getCategory(vm.category.id).then(function (data) {
                    vm.category = data;
                });
            }
        }


    }

})();