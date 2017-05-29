/**
 * Created by Reza on 11/30/2016.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .factory('fileService', fileService);

    /** @ngInject */
    function fileService($log, $http, host) {
        var base = host + 'file/';
        var service = {
            updateFile: updateFile,
            deleteFile: deleteFile
        };
        return service;

        function successCallback(response) {
            return response.data;
        }

        ////////////////

        function updateFile(file) {
            return $http.put(base, file)
                .then(successCallback);
        }

        function deleteFile(id) {
            var url = base + id;
            return $http.delete(url)
                .then(successCallback);
        }


    }

})();