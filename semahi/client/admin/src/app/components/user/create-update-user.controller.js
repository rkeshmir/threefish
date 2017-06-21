(function () {

    angular
        .module('app')
        .controller('CreateUpdateUserController', [
            'UserService',
            '$stateParams',
            'host',
            CreateUpdateUserController
        ]);

    function CreateUpdateUserController(UserService, $stateParams, host) {
        var vm = this;
        vm.method = $stateParams.method;
        vm.username = $stateParams.username;
        vm.host = host;
        vm.user = {
            title: 'Admin',
            email: 'contact@flatlogic.com',
            firstName: '',
            lastName: '',
            company: 'FlatLogic Inc.',
            address: 'Fabritsiusa str, 4',
            city: 'Minsk',
            state: '',
            biography: 'We are young and ambitious full service design and technology company. ' +
            'Our focus is JavaScript development and User Interface design.',
            postalCode: '220007'
        };

        if (vm.method === 'update')
            UserService.getUser($stateParams.username).then(function (data) {
                vm.user = data;
            });

    }

})();
