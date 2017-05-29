(function () {
    'use strict';

    angular
        .module('app')
        .controller('CreateUpdateCompanyController', CreateUpdateCompanyController);

    /** @ngInject */
    function CreateUpdateCompanyController($log, toastr, companyService, $stateParams, $timeout, $state) {
        var vm = this;
        vm.title = 'CreateUpdateUserController';
        vm.method = $stateParams.method;
        vm.company = {
            id: $stateParams.id
        };

        vm.save = save;
        vm.reset = reset;
        activate();

        ////////////////

        function activate() {
            $log.debug('Company module activated');
            getCompany();
        }

        function save() {
            switch (vm.method) {
                case 'create':
                    companyService.createCompany(vm.company)
                        .then(function () {
                            toastr.success('شرکت با موفقیت افزوده شد.');
                            $timeout(function () {
                                $state.go('root.company');
                            }, 3000)
                        }, function () {
                            toastr.error('خطا در افزودن شرکت!');
                        });
                    break;
                case 'update':
                    companyService.updateCompany(vm.company);
            }
        }





        function reset() {
            switch (vm.method) {
                case 'create':
                    vm.company = {
                    };
                    break;
                case 'update':
                    getCompany();
            }
        }

        function getCompany() {
            if (vm.company.id) {
                companyService.getCompany(vm.company.id).then(function (data) {
                    vm.company = data;
                });
            }
        }


    }

})();