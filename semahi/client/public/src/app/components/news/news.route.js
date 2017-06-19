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
            .state('root.news', {
                controller: 'NewsController',
                controllerAs: 'vm',
                data: {
                    roles: [
                        "admin"
                    ]
                },
                resolve: {},
                templateUrl: 'app/components/news/list-news.html',
                url: '/news'
            })
            .state('root.createUpdateNews', {
                controller: 'CreateUpdateNewsController',
                controllerAs: 'vm',
                data: {
                    roles: [
                        "admin"
                    ]
                },
                resolve: {},
                templateUrl: 'app/components/news/create-update-news.html',
                url: '/news/:method/:id'
            })

        ;
    }

})();
