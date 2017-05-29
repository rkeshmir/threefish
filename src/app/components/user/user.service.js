(function () {
	'use strict';
	
	angular
		.module('app')
		.factory('userService', userService);
	
	/** @ngInject */
	function userService($log, $http, host) {
		var base = host + 'user/';
		var service = {
            getUsers: getUsers,
            getAllUsers: getAllUser,
            getUser: getUser,
            getAuthorities: getAuthorities,
            createUser: createUser,
            updateUser: updateUser,
            deleteUser: deleteUser,
            resetPassword: resetPassword,
            addCredit: addCredit
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
            if(comment)
                url+='&comment='+comment;
            return $http.put(url)
                .then(successCallback);
        }

        function deleteUser(username) {
            var url = base + username;
            return $http.delete(url)
                .then(successCallback);
        }



	}
	
})();