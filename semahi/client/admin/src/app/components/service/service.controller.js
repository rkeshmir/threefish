(function () {

    angular
        .module('app')
        .controller('ServiceController', [
            'host',
            '$scope',
            '$mdToast',
            'ServiceService',
            ServiceController

        ]);

    function ServiceController(host, $scope, $mdToast, ServiceService) {
        var vm = this;

        vm.tableData = [];
        vm.totalItems = 0;
        vm.host = host;

        $scope.selected = [];

        $scope.query = {
            order: 'name',
            limit: 10,
            page: 1
        };

        $scope.render = function (T) {
            return T;
        };
        var lastQuery = null;
        vm.deleteService = deleteService;
        vm.bulkDelete = bulkDelete;
        vm.editService = editService;
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
            ServiceService.getServices()
                .then(function (servicesData) {
                    vm.tableData = servicesData.content;
                    // Represents the count of database count of records, not items array!
                    vm.totalItems = servicesData.totalItems;

                });

        }

        GetItemsData($scope.query);

        function deleteService(event, item) {
            console.log('event', event);
            event.stopPropagation();
            event.preventDefault();
            ServiceService.deleteService(item.servicename).then(function () {
                $mdToast.show($mdToast.simple()
                    .position('top right')
                    .toastClass('b-success')
                    .textContent(item.servicename + ' successfully deleted.')
                    .hideDelay(5000)
                );
                GetItemsData($scope.query);
            }, function (error) {
                console.error('error in removing service', error);
            })
        }

        function editService(event, item) {
            console.log('event', event);
            event.stopPropagation();
            event.preventDefault();

        }

        function bulkDelete() {
            if (!$scope.selected.length)
                return;
            var servicenames = [];
            $scope.selected.forEach(function (service) {
                servicenames.push(service.servicename);
            });
            return ServiceService.bulkDelete(servicenames).then(function () {
                $mdToast.show($mdToast.simple()
                    .position('top right')
                    .toastClass('b-success')
                    .textContent('Services successfully deleted.')
                    .hideDelay(5000)
                );
                GetItemsData($scope.query);
            }, function (error) {
                $mdToast.show($mdToast.simple()
                    .position('top right')
                    .toastClass('b-error')
                    .textContent('Error in deleting selected services.')
                    .hideDelay(5000)
                );
            })
        }

    }

})();
