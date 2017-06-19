(function () {
    'use strict';

    angular
        .module('app')
        .controller('BannerController', BannerController);

    /** @ngInject */
    function BannerController($log, NgTableParams, bannerService, host, toastr) {
        var vm = this;
        vm.title = 'BannerController';
        vm.host = host;
        vm.bannerTable = new NgTableParams({
            page: 1,
            count: 20
        }, {
            getData: getBanners
        });
        vm.delete = Delete;
        vm.publish = publish;
        vm.update = update;
        activate();

        ////////////////

        function activate() {
            $log.debug('Banner module activated');

        }

        function Delete(id) {
            vm.loading = true;
            bannerService.deleteBanner(id)
                .then(function () {
                    toastr.success('بنر با موفقیت حذف شد.');
                    vm.loading = false;
                    vm.bannerTable.reload();
                }, function () {
                    toastr.error('خطا در حذف بنر!');
                    vm.loading = false;
                });
        }

        function getBanners(tabelparams) {
            var params = {
                page: tabelparams.page() - 1,
                size: tabelparams.count()
            };
            vm.loading = true;
            return bannerService.getBanners(params).then(function (data) {
                vm.loading = false;
                tabelparams.total(data.totalElements);
                return data.content;
            });
        }

        function publish(banner) {
            vm.loading = true;
            bannerService.publishBanner(banner.id, banner.published)
                .then(function (data) {
                    vm.loading = false;
                    banner = data;
                    toastr.success('تغییر وضعیت نمایش بنر');
                }, function () {
                    banner.published = !banner.published;
                    vm.loading = false;
                    toastr.error('خطا در تغییر وضعیت نمایش بنر');
                });

        }

        function update(banner) {
            vm.loading = true;
            bannerService.updateBanner(banner.id, banner.label)
                .then(function () {
                    vm.loading = false;
                    banner.editing = false;
                    toastr.success('عنوان بنر با موفقیت ویرایش شد.');
                }, function () {
                    vm.loading = false;
                    vm.bannerTable.reload();
                    toastr.error('خطا در ویرایش عنوان بنر!');
                });
        }

    }

})();