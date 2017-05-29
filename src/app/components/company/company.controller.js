(function () {
	'use strict';
	
	angular
		.module('app')
		.controller('CompanyController', CompanyController);
	
	/** @ngInject */
    function CompanyController($log, NgTableParams, companyService, toastr) {
		var vm = this;
		vm.title = 'CompanyController';
        vm.companyTable = new NgTableParams({
            page: 1,
			count: 20
		}, {
			getData: getCompanies
		});
        vm.delete = Delete;
		
		activate();
		
		////////////////
		
		function activate() {
			$log.debug('Company module activated');

		}
		
		function getCompanies(tabelparams) {
			var params = {
                page: tabelparams.page() - 1,
				size: tabelparams.count()
			};
			return companyService.getCompanies(params).then(function (data) {
                tabelparams.total(data.totalElements);
				return data.content;
			});
		}

        function Delete(id) {
            companyService.deleteCompany(id)
                .then(function () {
                    toastr.success('شرکت با موفقیت حذف شد.');
                    vm.companyTable.reload();
                }, function () {
                    toastr.error('خطا در حذف شرکت!');
                })
        }
		
	}
	
})();