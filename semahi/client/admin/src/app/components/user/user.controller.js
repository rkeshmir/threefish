(function () {

    angular
        .module('app')
        .controller('UserController', [
            'tableService',
            '$scope',
            'UserService',
            UserController

        ]);

    function UserController(tableService, $scope, UserService) {
        var vm = this;

        vm.tableData = [];
        vm.totalItems = 0;

        $scope.selected = [];

        $scope.query = {
            order: 'name',
            limit: 10,
            page: 1
        };
        $scope.selected = [];

        $scope.render = function (T) {
            return T;
        };
        var lastQuery = null;
        vm.deleteUser = deleteUser;
        vm.editUser = editUser;
        vm.getItems = function () {
            /**
             * I don't know why this function is being called too many times,
             * it supposed to call once per pagination, so the next 3 lines are only to avoid
             * multiple requests.
             */
            var query = JSON.stringify($scope.query);
            if (query === lastQuery) return;
            lastQuery = query;
            GetItemsData($scope.query);

        };

        function GetItemsData(query) {
            /*tableService
                .loadByPagination(query)
                .then(function (tableData) {
                    vm.tableData = tableData.items;
                    // Represents the count of database count of records, not items array!
                    vm.totalItems = tableData.count;

             });*/
            UserService.getUsers()
                .then(function (usersData) {
                    vm.tableData = usersData.content;
                    // Represents the count of database count of records, not items array!
                    vm.totalItems = usersData.totalItems;

                });

        }

        GetItemsData($scope.query);

        function deleteUser(event, item) {
            console.log('event', event);
            event.stopPropagation();
            event.preventDefault();
            UserService.deleteUser(item.username).then(function () {
                GetItemsData($scope.query);
            }, function (error) {
                console.error('error in removing user', error);
            })
        }

        function editUser(event, item) {
            console.log('event', event);
            event.stopPropagation();
            event.preventDefault();

        }

    }

})();
