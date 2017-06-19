(function () {
	'use strict';
	
	angular
		.module('app')
		.factory('applicationService', applicationService);
	
	/** @ngInject */
    function applicationService($log, $http, host, Upload) {
		var base = host + 'application/';
		var service = {
            getApplications: getApplications,
            getSimurgh: getSimurgh,
            getApplication: getApplication,
            getFiles: getFiles,
            deleteFile: deleteFile,
            createApplication: createApplication,
            updateApplication: updateApplication,
            updateLogo: updateLogo,
            updateBanner: updateBanner,
            addPic: addPic,
            deletePic: deletePic,
            deleteApplication: deleteApplication
		};
		return service;

        function successCallback(response) {
            return response.data;
        }
		////////////////

        function createApplication(application) {
            return $http.post(base, application)
                .then(successCallback);
        }

        function getFiles(id) {
            var url = base + id + '/files';
            return $http.get(url)
                .then(successCallback);
        }

        function deleteFile(id, fileId) {
            var url = base + id + '/file/' + fileId;
            return $http.delete(url)
                .then(successCallback);
        }
		
		function getApplications(params) {
            params.manage = true;
			return $http.get(base, {params: params})
				.then(successCallback);
		}

        function getSimurgh(params) {
            var url = base + 'simorgh';
            return $http.get(url)
                .then(successCallback);
        }

        function getApplication(id) {
            var url = base + id + '?manage=true';
            return $http.get(url)
                .then(successCallback);
        }


        function updateApplication(application) {
            return $http.put(base, application)
                .then(successCallback);
        }

        function updateLogo(id, dataUrl) {
            var url = base + id + '/logo';
            return Upload.upload({
                url: url,
                file: Upload.dataUrltoBlob(dataUrl, 'image.png'),
                method: 'POST'
            })
                .then(successCallback);
        }

        function updateBanner(id, dataUrl) {
            var url = base + id + '/banner';
            return Upload.upload({
                url: url,
                file: Upload.dataUrltoBlob(dataUrl, 'image.jpg'),
                method: 'POST'
            })
                .then(successCallback);
        }

        function addPic(id, dataUrl, label) {
            var url = base + id + '/picture';
            return Upload.upload({
                url: url,
                data: {file: Upload.dataUrltoBlob(dataUrl, 'image.jpg'), label: label},
                method: 'POST'
            })
                .then(successCallback);
        }

        function deletePic(id, picId) {
            var url = base + id + "/picture/" + picId;
            return $http.delete(url)
                .then(successCallback);
        }

        function deleteApplication(id) {
            var url = base + id;
            return $http.delete(url)
                .then(successCallback);
        }



	}
	
})();