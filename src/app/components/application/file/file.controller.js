/**
 * Created by Reza on 11/19/2016.
 */

(function () {
    'use strict';

    angular
        .module('app')
        .controller('CreateUpdateFileController', CreateUpdateFileController);

    /** @ngInject */
    function CreateUpdateFileController($log, $q, host, file, application, $timeout,
                                        $uibModalInstance, Upload, toastr) {
        var vm = this;
        vm.application = application;
        vm.file = file | {};

        vm.uploadFile = uploadFile;

        function uploadFile(file) {
            file.upload = Upload.upload({
                url: host + '/application/4/file',
                data:{username: 'reza', file: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }




    }
});
