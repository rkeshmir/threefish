(function () {
    'use strict';

    angular
        .module('app')
        .controller('ServicesVm', ServicesVm);

    /** @ngInject */
    function ServicesVm($uibModalInstance, services) {
        var vm = this;
        vm.title = 'ServicesVm';
        vm.ok = ok;
        vm.cancel = cancel;
        vm.services = services;

        activate();

        ////////////////

        function activate() {
            console.log('Services module activated');

        }

        function ok() {
            console.log('ok');
            $uibModalInstance.close();
        };

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        };

    }

})();