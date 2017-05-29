(function () {
	'use strict';
	
	angular
		.module('app')
		.controller('AdController', AdController);
	
	/** @ngInject */
	function AdController($log, NgTableParams, adService, host, toastr) {
		var vm = this;
		vm.title = 'AdController';
		vm.host = host;
		vm.adTable = new NgTableParams({
			page: 1,
			count: 20
		}, {
			getData: getAds
		});
		vm.delete = Delete;
		activate();
		
		////////////////
		
		function activate() {
			$log.debug('Ad module activated');
			
		}
		
		function Delete(id) {
			adService.deleteAd(id)
				.then(function () {
					toastr.success('تبلیغات با موفقیت حذف شد.');
					vm.adTable.reload();
				}, function () {
					toastr.error('خطا در حذف تبلیغات!');
				});
		}
		
		function getAds(tabelparams) {
			var params = {
				page: tabelparams.page() - 1,
				size: tabelparams.count()
			};
			return adService.getAds(params).then(function (data) {
                tabelparams.total(data.totalElements);
				return data.content;
			});
		}


    }
	
})();