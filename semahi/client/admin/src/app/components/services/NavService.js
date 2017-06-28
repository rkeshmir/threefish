(function () {
    'use strict';

    angular.module('app')
        .service('navService', [
            '$q',
            navService
        ]);

    function navService($q) {
        var menuItems = [
            {
                name: 'Dashboard',
                icon: 'dashboard',
                sref: '.dashboard'
            },
            {
                name: 'User Management',
                icon: 'people',
                sref: '.users'
            },
            {
                name: 'Services',
                icon: 'assignment_turned_in',
                sref: '.services'
            },
            {
                name: 'Table',
                icon: 'view_module',
                sref: '.table'
            },
            {
                name: 'Data Table',
                icon: 'view_module',
                sref: '.data-table'
            }
        ];

        return {
            loadAllItems: function () {
                return $q.when(menuItems);
            }
        };
    }

})();
