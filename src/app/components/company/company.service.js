(function () {
	'use strict';
	
	angular
		.module('app')
		.factory('companyService', companyService);
	
	/** @ngInject */
	function companyService($log, $http, host) {
		var base = host + 'company/';
		var service = {
            getCompanies: getCompanies,
            getAllCompanies: getAllCompanies,
            getCompany: getCompany,
            createCompany: createCompany,
            updateCompany: updateCompany,
            deleteCompany: deleteCompany
		};
		return service;

        function successCallback(response) {
            return response.data;
        }
		////////////////

        function createCompany(company) {
            return $http.post(base, company)
                .then(successCallback);
        }


		
		function getCompanies(params) {
			return $http.get(base, {params: params})
				.then(successCallback);
		}

		function getAllCompanies() {
            var url = base + 'all';
            return $http.get(url)
                .then(successCallback);
        }

        function getCompany(id) {
            var url = base + id;
            return $http.get(url)
                .then(successCallback);
        }


        function updateCompany(company) {
            return $http.put(base, company)
                .then(successCallback);
        }


        function deleteCompany(id) {
            var url = base + id;
            return $http.delete(url)
                .then(successCallback);
        }



	}
	
})();