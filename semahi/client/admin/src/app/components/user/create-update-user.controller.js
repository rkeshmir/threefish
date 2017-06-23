(function () {

    angular
        .module('app')
        .controller('CreateUpdateUserController', [
            'UserService',
            '$stateParams',
            'host',
            '$mdToast',
            CreateUpdateUserController
        ]);

    function CreateUpdateUserController(UserService, $stateParams, host, $mdToast) {
        var vm = this;
        vm.method = $stateParams.method;
        vm.username = $stateParams.username;
        vm.host = host;
        vm.save = save;
        vm.revert = revert;
        vm.resetPassword = resetPassword;


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

    }

})();
