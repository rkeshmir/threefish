(function () {
	'use strict';
	
	angular
		.module('app')
		.factory('categoryService', categoryService);
	
	/** @ngInject */
    function categoryService($log, $http, host, Upload) {
		var base = host + 'category/';
		var service = {
            getCategories: getCategories,
            getAllCategories: getAllCategories,
            getCategory: getCategory,
            createCategory: createCategory,
            updateCategory: updateCategory,
            deleteCategory: deleteCategory
		};
		return service;

        function successCallback(response) {
            return response.data;
        }
		////////////////

        function createCategory(name, dataUrl) {
            return Upload.upload({
                url: base,
                data: {
                    pic: Upload.dataUrltoBlob(dataUrl, 'image.png'),
                    name: name
                },
                method: 'POST'
            });
            // return $http.post(base, category)
            //     .then(successCallback);
        }


		
		function getCategories(params) {
			return $http.get(base, {params: params})
				.then(successCallback);
		}

		function getAllCategories() {
            var url = base + 'all';
            return $http.get(url)
                .then(successCallback);
        }

        function getCategory(id) {
            var url = base + id;
            return $http.get(url)
                .then(successCallback);
        }


        function updateCategory(id, name, dataUrl) {
            console.log('updateCategory ', id);
            return Upload.upload({
                url: base + id,
                data: {
                    pic: dataUrl ? Upload.dataUrltoBlob(dataUrl, 'image.png') : null,
                    name: name
                },
                method: 'PUT'
            }).then(successCallback);
        }


        function deleteCategory(id) {
            var url = base + id;
            return $http.delete(url)
                .then(successCallback);
        }



	}
	
})();