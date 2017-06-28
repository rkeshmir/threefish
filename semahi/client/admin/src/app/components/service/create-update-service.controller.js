(function () {

    angular
        .module('app')
        .controller('CreateUpdateServiceController', [
            'ServiceService',
            '$stateParams',
            '$state',
            'host',
            '$mdToast',
            '$mdDialog',
            '$http',
            CreateUpdateServiceController
        ]);

    function CreateUpdateServiceController(ServiceService, $stateParams, $state, host, $mdToast, $mdDialog, $http) {
        var vm = this;
        vm.method = $stateParams.method;
        vm.id = $stateParams.id;
        vm.host = host;
        vm.save = save;
        vm.revert = revert;
        vm.tmpDate = (new Date()).getMilliseconds();
        vm.pictureDialog = pictureDialog;
        vm.updateLogoOut = updateLogoOut;
        vm.updateLogoAnimatedIn = updateLogoAnimatedIn;
        vm.updateLogoIn = updateLogoIn;
        vm.updateLogoAnimatedOut = updateLogoAnimatedOut;

        initiateService();

        function save() {
            if (vm.method === 'create')
                createService();
            else if (vm.method === 'update')
                updateService();
        }

        function createService() {
            ServiceService.createService(vm.service).then(function (data) {
                console.log(data);
                vm.service = data;
                $mdToast.show($mdToast.simple()
                    .position('top right')
                    .toastClass('b-success')
                    .textContent('Service successfully created.')
                    .hideDelay(5000)
                );
                $state.go('home.create-update-service', {'method': 'update', 'id': vm.service.id})
            }, function (error) {
                $mdToast.show($mdToast.simple()
                    .position('top right')
                    .toastClass('b-error')
                    .textContent('Error in creating service')
                    .hideDelay(5000)
                );
            })
        }

        function updateService() {
            ServiceService.updateService(vm.service).then(function (data) {
                vm.service = data;
                $mdToast.show($mdToast.simple()
                    .position('top right')
                    .toastClass('b-success')
                    .textContent('Service successfully updated.')
                    .hideDelay(5000)
                );
            }, function (error) {
                $mdToast.show($mdToast.simple()
                    .position('top right')
                    .toastClass('b-error')
                    .textContent('Error in updating service.')
                    .hideDelay(5000)
                );
            })
        }

        function initiateService() {
            if (vm.method === 'create')
                vm.service = {};
            else if (vm.method === 'update')
                ServiceService.getService($stateParams.id).then(function (data) {
                    vm.service = data;
                }, function (error) {
                    $mdToast.show($mdToast.simple()
                        .position('top right')
                        .toastClass('b-error')
                        .textContent('Error in loading service')
                        .hideDelay(5000)
                    );
                });
        }

        function revert() {
            initiateService();
        }

        function pictureDialog($event, type) {
            var parentEl = angular.element(document.body);
            var dialog = $mdDialog.show({
                parent: parentEl,
                targetEvent: $event,
                templateUrl: 'app/components/service/upload-picture-dialog.html',
                locals: {
                    service: vm.service,
                    host: vm.host,
                    type: type
                },
                controller: DialogController,
                controllerAs: 'dialogVm',
                flex: '80%'
            });
            dialog.then(function () {

            });
            function DialogController($scope, $mdDialog, service, host, type) {
                var dialogVm = this;
                dialogVm.service = service;
                dialogVm.host = host;
                dialogVm.closeDialog = function () {
                    $mdDialog.hide();
                };
                dialogVm.bounds = {
                    top: 200,
                    bottom: 0,
                    right: 200,
                    left: 0
                };
                dialogVm.updatePic = updatePic;
                function updatePic(dataUrl) {
                    dialogVm.loading = true;
                    ServiceService[type](vm.service.id, dataUrl, dialogVm.picLabel)
                        .then(
                            function (response) {
                                vm.service.mainPic = response;
                                dialogVm.picLabel = '';
                                $mdToast.show($mdToast.simple()
                                    .position('top right')
                                    .toastClass('b-success')
                                    .textContent('Picture successfully updated')
                                    .hideDelay(5000)
                                );
                                vm.tmpDate = (new Date()).getMilliseconds();
                                dialogVm.cropper = {};
                                dialogVm.cropper.sourceImage = null;
                                dialogVm.cropper.croppedImage = null;
                                // dialogVm.loading = false;
                                $mdDialog.hide();
                            },
                            function (response) {
                                if (response.status > 0) {
                                    dialogVm.errorMsg = response.status + ': ' + response.data;
                                }
                                $mdToast.show($mdToast.simple()
                                    .position('top right')
                                    .toastClass('b-success')
                                    .textContent('Error in updating profile picture')
                                    .hideDelay(5000)
                                );
                                dialogVm.loading = false;
                            },
                            function (evt) {
                                dialogVm.progress = parseInt(100.0 * evt.loaded / evt.total);
                                dialogVm.loading = false;
                            });
                }
            }
        }

        function updateLogoOut() {
            var formData = new FormData();
            angular.forEach(vm.logoOutFile, function (obj) {
                if (!obj.isRemote) {
                    formData.append('file', obj.lfFile);
                }
            });
            ServiceService.updateLogoOut(vm.service.id, formData).then(function (result) {
                vm.logoOutFileApi.removeAll();
                $mdToast.show($mdToast.simple()
                    .position('top right')
                    .toastClass('b-success')
                    .textContent('Logo successfully updated.')
                    .hideDelay(5000)
                );
                vm.tmpDate = (new Date()).getMilliseconds();
            }, function (err) {
                $mdToast.show($mdToast.simple()
                    .position('top right')
                    .toastClass('b-error')
                    .textContent('Error in updating logo.')
                    .hideDelay(5000)
                );
            });
        }

        function updateLogoAnimatedIn() {
            var formData = new FormData();
            angular.forEach(vm.logoAnimatedInFile, function (obj) {
                if (!obj.isRemote) {
                    formData.append('file', obj.lfFile);
                }
            });
            ServiceService.updateLogoAnimatedIn(vm.service.id, formData).then(function (result) {
                vm.logoAnimatedInFileApi.removeAll();
                $mdToast.show($mdToast.simple()
                    .position('top right')
                    .toastClass('b-success')
                    .textContent('Logo successfully updated.')
                    .hideDelay(5000)
                );
                vm.tmpDate = (new Date()).getMilliseconds();
            }, function (err) {
                $mdToast.show($mdToast.simple()
                    .position('top right')
                    .toastClass('b-error')
                    .textContent('Error in updating logo.')
                    .hideDelay(5000)
                );
            });
        }

        function updateLogoIn() {
            var formData = new FormData();
            angular.forEach(vm.logoInFile, function (obj) {
                if (!obj.isRemote) {
                    formData.append('file', obj.lfFile);
                }
            });
            ServiceService.updateLogoIn(vm.service.id, formData).then(function (result) {
                vm.logoInFileApi.removeAll();
                $mdToast.show($mdToast.simple()
                    .position('top right')
                    .toastClass('b-success')
                    .textContent('Logo successfully updated.')
                    .hideDelay(5000)
                );
                vm.tmpDate = (new Date()).getMilliseconds();
            }, function (err) {
                $mdToast.show($mdToast.simple()
                    .position('top right')
                    .toastClass('b-error')
                    .textContent('Error in updating logo.')
                    .hideDelay(5000)
                );
            });
        }

        function updateLogoAnimatedOut() {
            var formData = new FormData();
            angular.forEach(vm.logoAnimatedOutFile, function (obj) {
                if (!obj.isRemote) {
                    formData.append('file', obj.lfFile);
                }
            });
            ServiceService.updateLogoAnimatedOut(vm.service.id, formData).then(function (result) {
                vm.logoAnimatedOutFileApi.removeAll();
                $mdToast.show($mdToast.simple()
                    .position('top right')
                    .toastClass('b-success')
                    .textContent('Logo successfully updated.')
                    .hideDelay(5000)
                );
                vm.tmpDate = (new Date()).getMilliseconds();
            }, function (err) {
                $mdToast.show($mdToast.simple()
                    .position('top right')
                    .toastClass('b-error')
                    .textContent('Error in updating logo.')
                    .hideDelay(5000)
                );
            });
        }

    }

})();
