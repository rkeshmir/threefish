/**
 * Created by reza on 11/14/16.
 */

(function () {
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('root.banner', {
                controller: 'BannerController',
                controllerAs: 'vm',
                data: {
                    roles: [
                        "admin"
                    ]
                },
                resolve: {},
                templateUrl: 'app/components/banner/list-banner.html',
                url: '/banner'
            })
            .state('root.createUpdateBanner', {
                controller: 'CreateUpdateBannerController',
                controllerAs: 'vm',
                data: {
                    roles: [
                        "admin"
                    ]
                },
                resolve: {},
                templateUrl: 'app/components/banner/create-update-banner.html',
                url: '/banner/:method/:id'
            })

        ;
    }

})();
