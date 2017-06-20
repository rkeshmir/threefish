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
         });

        ;
    }

})();
