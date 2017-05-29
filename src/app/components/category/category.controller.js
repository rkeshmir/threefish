(function () {
	'use strict';
	
	angular
		.module('app')
        .controller('CategoryController', CategoryController);
	
	/** @ngInject */
    function CategoryController($log, NgTableParams, categoryService, toastr, host) {
		var vm = this;
        vm.title = 'CategoryController';
        vm.host = host;
        vm.categoryTable = new NgTableParams({
            page: 1,
			count: 20
		}, {
            getData: getCategories
		});
        vm.delete = Delete;
		activate();
		
		////////////////
		
		function activate() {
            $log.debug('Category module activated');

		}

        function Delete(id) {
            categoryService.deleteCategory(id)
                .then(function () {
                    toastr.success('دسته‌بندی با موفقیت حذف شد.');
                    vm.categoryTable.reload();
                }, function () {
                    toastr.error('خطا در حذف دسته‌بندی!');
                });
        }

        function getCategories(tabelparams) {
			var params = {
                page: tabelparams.page() - 1,
				size: tabelparams.count()
			};
            return categoryService.getCategories(params).then(function (data) {
                tabelparams.total(data.totalElements);
				return data.content;
			});
		}
		
		
	}
	
})();