(function () {
    'use strict';

    angular
        .module('app')
        .factory('ServiceService', ServiceService);

    /** @ngInject */
    function ServiceService($log, $http, host, Upload) {
        var base = host + 'service/';
        var service = {
            getServices: getServices,
            getActiveServices: getActiveServices,
            getService: getService,

            createService: createService,
            updateService: updateService,

            deleteService: deleteService,
            bulkDelete: bulkDelete,

            updateMainPic: updateMainPic,
            updateLogoOut: updateLogoOut,
            updateLogoAnimatedIn: updateLogoAnimatedIn,
            updateLogoIn: updateLogoIn,
            updateLogoAnimatedOut: updateLogoAnimatedOut

        };
        return service;

        function successCallback(response) {
            return response.data;
        }

        ////////////////

        function createService(service) {
            return $http.post(base, service)
                .then(successCallback);
        }

        function getServices(params) {
            return $http.get(base, {params: params})
                .then(successCallback);
        }

        function getService(id) {
            var url = base + id + '?manage=true';
            return $http.get(url)
                .then(successCallback);
        }

        function getActiveServices() {
            var url = base + 'active';
            return $http.get(url)
                .then(successCallback);
        }

        function getAuthorities() {
            var url = base + 'authorities';
            return $http.get(url)
                .then(successCallback);
        }

        function updateService(service) {
            return $http.put(base, service)
                .then(successCallback);
        }


        function deleteService(id) {
            var url = base + id;
            return $http.delete(url)
                .then(successCallback);
        }

        function bulkDelete(ids) {
            var url = base + 'bulkDelete?';
            if (ids === null || ids === undefined || !ids.length)
                return;
            ids.forEach(function (id) {
                url += 'id=' + id + '&';
            });
            return $http.delete(url)
                .then(successCallback);
        }

        function updateMainPic(id, dataUrl) {
            var url = base + id + '/mainPic';
            return Upload.upload({
                url: url,
                file: Upload.dataUrltoBlob(dataUrl, 'image.jpg'),
                method: 'POST'
            })
                .then(successCallback);
        }

        function updateLogoOut(id, formData) {
            return $http.post(base + id + '/logoOut', formData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
        }

        function updateLogoAnimatedIn(id, formData) {
            return $http.post(base + id + '/logoAnimatedIn', formData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
        }

        function updateLogoIn(id, formData) {
            return $http.post(base + id + '/logoIn', formData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
        }

        function updateLogoAnimatedOut(id, formData) {
            return $http.post(base + id + '/logoAnimatedOut', formData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
        }


    }

})();