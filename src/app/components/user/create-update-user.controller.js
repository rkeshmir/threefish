(function () {
    'use strict';

    angular
        .module('app')
        .controller('CreateUpdateUserController', CreateUpdateUserController);

    /** @ngInject */
    function CreateUpdateUserController($log, toastr, userService, $stateParams, $scope, $timeout, $state) {
        var vm = this;
        vm.title = 'CreateUpdateUserController';
        vm.method = $stateParams.method;
        vm.user = {
            username: $stateParams.username,
            authorities: []
        };

        vm.save = save;
        vm.reset = reset;
        vm.resetPassword = resetPassword;
        vm.addCredit = addCredit;
        activate();

        ////////////////

        function activate() {
            $log.debug('User module activated');
            getAuthorities().then(getUser);
        }

        function save() {
            vm.user.authorities = [];
            vm.userAuthorities.forEach(function (authority) {
                vm.user.authorities.push({
                    authority: authority.authority,
                    username: vm.user.username
                })
            });
            switch (vm.method) {
                case 'create':
	                userService.createUser(vm.user).then(function () {
                        toastr.success('کاربر با موفقیت  ایجاد شد.');
		                $timeout(function () {
			                $state.go('root.user');
		                }, 3000);
	                }, function () {
		                toastr.error('خطا در ایجاد کاربر!');
	                });
                    break;
                case 'update':
	                userService.updateUser(vm.user).then(function () {
		                toastr.success('کابر با موفقیت به روزرسانی شد.')
	                }, function () {
		                toastr.error('خطا در به روزرسانی کاربر!');
	                });
            }
        }

        function getAuthorities() {
            return userService.getAuthorities().then(function (data) {
                vm.authorities = data;
            })
        }

        function getCaption(authority) {
            for (var i = 0; i < vm.authorities.length; i++) {
                if (vm.authorities[i].authority == authority)
                    return vm.authorities[i].caption;
            }
        }

        function reset() {
            switch (vm.method) {
                case 'create':
                    vm.user = {
                        authorities: []
                    };
                    console.log('method');
                    break;
                case 'update':
                    getUser();
            }
        }

        function getUser() {
            vm.userAuthorities = [];
            if (vm.user.username) {
                userService.getUser(vm.user.username).then(function (data) {
                    vm.user = data;
                    // console.log(data);
                    vm.passwordCheck = data.password;
                    vm.user.authorities.forEach(function (authority) {
                        vm.userAuthorities.push({
                            "authority": authority.authority,
                            "caption": getCaption(authority.authority)
                        })
                    })
                });
            }
        }

        function resetPassword() {
	        userService.resetPassword(vm.user.username, vm.user.password).then(function () {
		        toastr.success('گذرواژه با موفقیت به روزرسانی شد.')
	        }, function () {
		        toastr.error('خطا در به روزرسانی گذرواژه!');
	        });
        }

        function addCredit() {
            userService.addCredit(vm.user.username, vm.creditToAdd, vm.creditComment).then(function (data) {
                toastr.success('اعتبار با موفقیت افزوده شد.');
                vm.user.credit = data;
                vm.creditToAdd = null;
                vm.creditComment = null;
            }, function () {
                toastr.error('خطا در افزایش موجودی!');
            })
        }

        var stillClearPassword = true;
        $scope.$watch(angular.bind(this, function () {
            return this.user.password;
        }), function (newVal) {
            if (stillClearPassword && newVal !== undefined && newVal !== null) {
                vm.user.password = '';
                stillClearPassword = false;
            }
        });
    }

})();