(function () {
	'use strict';
	
	angular
		.module('app')
		.controller('UserController', UserController);
	
	/** @ngInject */
    function UserController($log, NgTableParams, userService, toastr) {
		var vm = this;
		vm.title = 'UserController';
		vm.userTable = new NgTableParams({
            page: 1,
			count: 20
		}, {
			getData: getUsers
		});
        vm.delete = Delete;
        vm.getCaption = getCaption;
        vm.getAuthorityClass = getAuthorityClass;
		activate();
		
		////////////////
		
		function activate() {
			$log.debug('User module activated');
            getAuthorities();

		}

        function getAuthorities() {
            return userService.getAuthorities().then(function (data) {
                vm.authorities = data;
            })
        }

        function getAuthorityClass(authority) {
            if (authority == 'admin')
                return "btn-success";
            return "btn-default";
        }

        function getCaption(authority) {
            if (vm.authorities)
                for (var i = 0; i < vm.authorities.length; i++) {
                    if (vm.authorities[i].authority == authority)
                        return vm.authorities[i].caption;
                }
        }
		
		function getUsers(tabelparams) {
			var params = {
                page: tabelparams.page() - 1,
				size: tabelparams.count()
			};
			return userService.getUsers(params).then(function (data) {
                tabelparams.total(data.totalElements);
				return data.content;
			});
		}

        function Delete(username) {
            userService.deleteUser(username).then(function () {
                toastr.success('کاربر با موفقیت حذف شد');
                vm.userTable.reload();
            }, function () {
                toastr.error('خطا در حذف کاربر!');
            })
        }
		
		
	}
	
})();