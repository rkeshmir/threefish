(function () {
    'use strict';

    angular
        .module('app')
        .controller('NewsController', NewsController);

    /** @ngInject */
    function NewsController($log, NgTableParams, newsService, toastr, host) {
        var vm = this;
        vm.title = 'NewsController';
        vm.host = host;
        vm.newsTable = new NgTableParams({
            page: 1,
            count: 20
        }, {
            getData: getNewsList
        });
        vm.delete = Delete;
        activate();

        ////////////////

        function activate() {
            $log.debug('News module activated');

        }

        function Delete(id) {
            newsService.deleteNews(id)
                .then(function () {
                    toastr.success('دسته‌بندی با موفقیت حذف شد.');
                    vm.newsTable.reload();
                }, function () {
                    toastr.error('خطا در حذف دسته‌بندی!');
                });
        }

        function getNewsList(tabelparams) {
            var params = {
                page: tabelparams.page() - 1,
                size: tabelparams.count()
            };
            return newsService.getNewsList(params).then(function (data) {
                tabelparams.total(data.totalElements);
                return data.content;
            });
        }


    }

})();