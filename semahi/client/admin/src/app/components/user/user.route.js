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
            .state('home.users', {
                url: '/user',
                controller: 'UserController',
                controllerAs: 'vm',
                templateUrl: 'app/components/user/user-list.html',
                data: {
                    title: 'User Management'
                }
            }).state('home.create-update-user', {
            url: '/cu-user/:method?username',
            controller: 'CreateUpdateUserController',
            controllerAs: 'vm',
            templateUrl: 'app/components/user/create-update-user.html',
            data: {
                title: 'Create Update User'
            }
        })
        ;
    }

})();
