(function () {
    'use strict';

    angular
        .module('auth')
        .factory('RequestService', RequestService);

    /** @ngInject */
    function RequestService($http, $httpParamSerializer, $q, host, Util) {
        return theService;

        function theService(base) {
            var url = host + base;

            var service = {
                'delete': delet,
                'get': get,
                'getById': getById,
                'getFile': getFile,
                'multipartPost': multipartPost,
                'multipartPut': multipartPut,
                'post': post,
                'put': put,
                'xPost': xPost,
                'xPut': xPut
            };

            return service;

            function delet(id, params) {
                var path = id ? (url + id ) : url;
                return $http.delete(path, {params: params})
                    .then(successCallback).catch(errorCallback);
            }

            function get(params) {
                var URL = url[url.length - 1] === '/' ? url.substr(0, url.length - 1) : url;
                return $http.get(URL, {params: params})
                    .then(successCallback).catch(errorCallback);
            }

            function getFile(params) {
                var URL = url[url.length - 1] === '/' ? url.substr(0, url.length - 1) : url;
                return $http({
                    url: URL,
                    method: "GET",
                    params: params,
                    responseType: 'arraybuffer'
                }).then(successCallback).catch(errorCallback);
            }

            function getById(id, params) {
                return $http.get(url + id, {params: params})
                    .then(successCallback).catch(errorCallback);
            }

            function multipartPost(data, params) {
                var config = {
                    headers: {'Content-Type': undefined},
                    params: params,
                    transformRequest: transformRequest
                };
                var URL = url[url.length - 1] === '/' ? url.substr(0, url.length - 1) : url;
                return $http.post(URL, data, config)
                    .then(successCallback).catch(errorCallback);
            }

            function multipartPut(id, data, params) {
                var config = {
                    headers: {'Content-Type': undefined},
                    params: params,
                    transformRequest: transformRequest
                };
                var URL = id ? url + id : url;
                return $http.put(URL, data, config)
                    .then(successCallback).catch(errorCallback);
            }

            function post(data, params) {
                var URL = url[url.length - 1] === '/' ? url.substr(0, url.length - 1) : url;
                return $http.post(URL, data, {params: params})
                    .then(successCallback).catch(errorCallback);
            }

            function put(id, data, params) {
                var URL = id ? url + id : url;
                return $http.put(URL, data, {params: params})
                    .then(successCallback).catch(errorCallback);
            }

            function xPost(data, params) {
                var config = {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    params: params
                };
                var URL = url[url.length - 1] === '/' ? url.substr(0, url.length - 1) : url;
                return $http.post(URL, $httpParamSerializer(data), config)
                    .then(successCallback).catch(errorCallback);
            }

            function xPut(id, data, params) {
                var config = {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    params: params
                };
                var URL = id ? url + id : url;
                return $http.put(URL, $httpParamSerializer(data), config)
                    .then(successCallback).catch(errorCallback);
            }

        }

        function errorCallback(response) {
            var message = (response && response.data && response.data.message) ?
                'APP.ERRORS.' + response.data.message : '';
            Util.toast('error', message);
            return $q.reject(response);
        }

        function successCallback(response) {
            return response.data;
        }

        function transformRequest(data) {
            var formData = new FormData();
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    formData.append(key, data[key]);
                }
            }
            return formData;
        }

    }
})();
