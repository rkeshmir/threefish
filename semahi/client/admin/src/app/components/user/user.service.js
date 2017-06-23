(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    /** @ngInject */
    function UserService($log, $http, host, Upload) {
        var base = host + 'user/';
        var service = {
            getUsers: getUsers,
            getAllUsers: getAllUser,
            getUser: getUser,
            getAuthorities: getAuthorities,
            createUser: createUser,
            updateUser: updateUser,
            deleteUser: deleteUser,
            bulkDelete: bulkDelete,
            resetPassword: resetPassword,
            addCredit: addCredit,
            updateProfilePic: updateProfilePic
        };
        return service;

        function successCallback(response) {
            return response.data;
        }

        ////////////////

        function createUser(user) {
            return $http.post(base, user)
                .then(successCallback);
        }

        function getUsers(params) {
            return $http.get(base, {params: params})
                .then(successCallback);
        }

        function getUser(username) {
            var url = base + username;
            return $http.get(url)
                .then(successCallback);
        }

        function getAllUser() {
            var url = base + 'all';
            return $http.get(url)
                .then(successCallback);
        }

        function getAuthorities() {
            var url = base + 'authorities';
            return $http.get(url)
                .then(successCallback);
        }

        function updateUser(user) {
            return $http.put(base, user)
                .then(successCallback);
        }

        function resetPassword(username, password) {
            var url = base + 'resetPassword?username=' + username;
            return $http.put(url, password)
                .then(successCallback);
        }

        function addCredit(username, amount, comment) {
            var url = base + username + '/addCredit?amount=' + amount;
            if (comment)
                url += '&comment=' + comment;
            return $http.put(url)
                .then(successCallback);
        }

        function deleteUser(username) {
            var url = base + username;
            return $http.delete(url)
                .then(successCallback);
        }

        function bulkDelete(usernames) {
            var url = base + 'bulkDelete?';
            if(usernames === null || usernames === undefined || !usernames.length)
                return;
            usernames.forEach(function (username) {
                url += 'username='+username+'&';
            });
            return $http.delete(url)
                .then(successCallback);
        }

        function updateProfilePic(username, dataUrl) {
            var url = base + username + '/picture';
            return Upload.upload({
                url: url,
                file: Upload.dataUrltoBlob(dataUrl, 'image.png'),
                method: 'POST'
            })
                .then(successCallback);
        }


    }

})();