(function () {

    angular
        .module('app')
        .controller('CreateUpdateUserController', [
            'UserService',
            '$stateParams',
            'host',
            '$mdToast',
            '$mdDialog',
            CreateUpdateUserController
        ]);

    function CreateUpdateUserController(UserService, $stateParams, host, $mdToast, $mdDialog) {
        var vm = this;
        vm.method = $stateParams.method;
        vm.username = $stateParams.username;
        vm.host = host;
        vm.save = save;
        vm.revert = revert;
        vm.resetPassword = resetPassword;
        vm.tmpDate = new Date();
        vm.showDialog = showDialog;

        UserService.getAuthorities().then(function (data) {
           vm.authorities = data;
        });
        initiateUser();

        function save() {
            vm.user.authorities.forEach(function (auth) {
                auth.username = vm.user.username;
            });
            if(vm.method === 'create')
                createUser();
            else if(vm.method === 'update')
                updateUser();
        }
        
        function createUser() {
            UserService.createUser(vm.user).then(function (data) {
                vm.user = data;
                $mdToast.show($mdToast.simple()
                    .position('top right')
                    .toastClass('b-success')
                    .textContent('User successfully created.')
                    .hideDelay(5000)
                );
            }, function (error) {
                $mdToast.show($mdToast.simple()
                    .position('top right')
                    .toastClass('b-error')
                    .textContent('Error in creating user')
                    .hideDelay(5000)
                );
            })
        }

        function updateUser() {
            UserService.updateUser(vm.user).then(function (data) {
                vm.user = data;
                $mdToast.show($mdToast.simple()
                    .position('top right')
                    .toastClass('b-success')
                    .textContent('User successfully updated.')
                    .hideDelay(5000)
                );
            }, function (error) {
                $mdToast.show($mdToast.simple()
                    .position('top right')
                    .toastClass('b-error')
                    .textContent('Error in updating user.')
                    .hideDelay(5000)
                );
            })
        }

        function initiateUser() {
            if(vm.method === 'create')
                vm.user = {
                    authorities: []
                };
            else if (vm.method === 'update')
                UserService.getUser($stateParams.username).then(function (data) {
                    vm.user = data;
                }, function (error) {
                    $mdToast.show($mdToast.simple()
                        .position('top right')
                        .toastClass('b-error')
                        .textContent('Error in loading user')
                        .hideDelay(5000)
                    );
                });
        }

        function revert() {
            initiateUser();
        }
        function resetPassword() {
            if(vm.password !== vm.passwordRepeat || !vm.password)
                return;
            UserService.resetPassword(vm.user.username, vm.password)
                .then(function () {
                    $mdToast.show($mdToast.simple()
                        .position('top right')
                        .toastClass('b-success')
                        .textContent('Password successfully updated')
                        .hideDelay(5000)
                    );
                }, function () {
                    $mdToast.show($mdToast.simple()
                        .position('top right')
                        .toastClass('b-error')
                        .textContent('Error in resetting password')
                        .hideDelay(5000)
                    );
                })
        }

        function showDialog($event) {
            var parentEl = angular.element(document.body);
            $mdDialog.show({
                parent: parentEl,
                targetEvent: $event,
                templateUrl: 'app/components/user/upload-picture-dialog.html',
                locals: {
                    user: vm.user,
                    host: vm.host
                },
                controller: DialogController,
                controllerAs: 'dialogVm',
                flex: '80%'
            });
            function DialogController($scope, $mdDialog, user) {
                var dialogVm = this;
                dialogVm.user = user;
                dialogVm.closeDialog = function() {
                    $mdDialog.hide();
                };
                dialogVm.updateProfilePic = updateProfilePic;
                function updateProfilePic(dataUrl) {
                    vm.loading = true;
                    UserService.updateProfilePic(vm.user.username, dataUrl, dialogVm.picLabel)
                        .then(
                            function (response) {
                                vm.user.profilePicture = response;
                                dialogVm.picLabel = '';
                                $mdToast.show($mdToast.simple()
                                    .position('top right')
                                    .toastClass('b-success')
                                    .textContent('Picture successfully updated')
                                    .hideDelay(5000)
                                );
                                dialogVm.tmpDate = new Date();
                                dialogVm.cropper = {};
                                dialogVm.cropper.sourceImage = null;
                                dialogVm.cropper.croppedImage = null;
                                dialogVm.loading = false;
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

    }

})();
