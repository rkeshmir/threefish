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

        activate();

        ////////////////

        function activate() {
            $log.debug('News module activated');

        }

    }

})();