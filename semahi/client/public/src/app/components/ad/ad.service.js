(function () {
	'use strict';
	
	angular
		.module('app')
		.factory('adService', adService);
	
	/** @ngInject */
	function adService($log, $http, host, Upload) {
		var base = host + 'ad/';
		var service = {
			getAds: getAds,
			getAllAds: getAllAds,
			getAd: getAd,
			createAd: createAd,
			updateAd: updateAd,
			deleteAd: deleteAd,
			publishAd: publishAd
		};
		return service;
		
		function successCallback(response) {
			return response.data;
		}
		
		////////////////

        function createAd(data, dataUrl) {
            data.file = Upload.dataUrltoBlob(dataUrl, 'image.jpg');
			return Upload.upload({
				url: base,
                data: data,
				method: 'POST'
			});
		}
		
		
		function getAds(params) {
			return $http.get(base, {params: params})
				.then(successCallback);
		}
		
		function getAllAds() {
			var url = base + 'all';
			return $http.get(url)
				.then(successCallback);
		}
		
		function getAd(id) {
			var url = base + id;
			return $http.get(url)
				.then(successCallback);
		}


        function updateAd(id, data, dataUrl) {
			console.log('updateAd ', id);
			var url = base + id;
            if (dataUrl)
                data.file = Upload.dataUrltoBlob(dataUrl, 'image.jpg');
            return Upload.upload({
                url: url,
                data: data,
                method: 'PUT'
            });
		}
		
		
		function deleteAd(id) {
			var url = base + id;
			return $http.delete(url)
				.then(successCallback);
		}
		
		function publishAd(id, publish) {
			console.log('publishAd', id, publish);
			var url = base + id + '/publish';
			return $http.put(url, {},
				{
					params: {
						'publish': publish
					}
				});
		}
		
	}
	
})();