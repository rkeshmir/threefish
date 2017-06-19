(function () {
    'use strict';

    angular
        .module('app')
        .controller('CreateUpdateNewsController', CreateUpdateNewsController);

    /** @ngInject */
    function CreateUpdateNewsController($log, $timeout, newsService, $stateParams, toastr, $state, host) {
        var vm = this;
        vm.title = 'CreateUpdateUserController';
        vm.host = host;
        vm.method = $stateParams.method;
        vm.news = {
            id: $stateParams.id
        };

        vm.save = save;
        vm.reset = reset;
        vm.mainPicture = mainPicture;
        vm.date = new Date();
        activate();

        ////////////////

        function activate() {
            $log.debug('News module activated');
            getNews();
        }

        function save() {
            vm.loading = true;
            switch (vm.method) {
                case 'create':
                    newsService.createNews(vm.news)
                        .then(function (response) {
                            console.log(response);
                            $timeout(function () {
                                $state.go('root.createUpdateNews', {method: 'update', id: response.data.id});
                                vm.loading = false;
                            }, 3000);
                            toastr.success('خبر با موفقیت افزوده شد.');
                        }, function () {
                            toastr.error('خطا در ایجاد خبر!');
                            vm.loading = false;
                        });
                    break;
                case 'update':
                    newsService.updateNews(vm.news)
                        .then(function (data) {
                            vm.news = data;
                            toastr.success('خبر با موفقیت ویرایش شد.');
                            vm.loading = false;
                        }, function () {
                            toastr.error('خطا در ویرایش خبر!');
                            vm.loading = false;
                        });
                    break;
                default:
                    vm.loading = false;
            }
        }

        function mainPicture() {
            vm.loading = true;
            newsService.mainPicture(vm.news.id, vm.cropper.croppedImage).then(
                function (data) {
                    vm.news = data;
                    vm.date = new Date();
                    vm.cropper = {};
                    vm.loading = false;
                    toastr.success('تصویر خبر با موفقیت به‌روزرسانی شد.');
                }
            );
        }

        function reset() {
            switch (vm.method) {
                case 'create':
                    vm.news = {};
                    break;
                case 'update':
                    getNews();
            }
        }

        function getNews() {
            if (vm.news.id) {
                vm.loading = true;
                newsService.getNews(vm.news.id).then(function (data) {
                    vm.loading = false;
                    vm.news = data;
                }, function () {
                    vm.loading = false;
                });
            }
        }


    }

})();