/**
 * Created by r.kashmir on 6/19/2017.
 */
(function () {
    'use strict';

    angular
        .module('angularMaterialAdmin')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('home.services', {
                url: '/service',
                controller: 'ServiceController',
                controllerAs: 'vm',
                templateUrl: 'app/components/service/service-list.html',
                data: {
                    title: 'Service Management'
                }
            }).state('home.create-update-service', {
            url: '/cu-service/:method?id',
            controller: 'CreateUpdateServiceController',
            controllerAs: 'vm',
            templateUrl: 'app/components/service/create-update-service.html',
            data: {
                title: 'Create Update Service'
            }
        })
        ;
    }

})();
