(function () {
    'use strict';

    angular
        .module('app')
        .factory('bannerService', bannerService);

    /** @ngInject */
    function bannerService($log, $http, host, Upload) {
        var base = host + 'banner/';
        var service = {
            getBanners: getBanners,
            getAllBanners: getAllBanners,
            getBanner: getBanner,
            createBanner: createBanner,
            updateBanner: updateBanner,
            deleteBanner: deleteBanner,
            publishBanner: publishBanner
        };
        return service;

        function successCallback(response) {
            return response.data;
        }

        ////////////////

        function createBanner(label, dataUrl) {
            return Upload.upload({
                url: base,
                data: {
                    file: Upload.dataUrltoBlob(dataUrl, 'image.jpg'),
                    label: label
                },
                method: 'POST'
            });
            // return $http.post(base, banner)
            //     .then(successCallback);
        }


        function getBanners(params) {
            return $http.get(base, {params: params})
                .then(successCallback);
        }

        function getAllBanners() {
            var url = base + 'all';
            return $http.get(url)
                .then(successCallback);
        }

        function getBanner(id) {
            var url = base + id;
            return $http.get(url)
                .then(successCallback);
        }


        function updateBanner(id, caption) {
            console.log('updateBanner ', id);
            var url = base + id;
            return $http.put(url, {}, {params: {caption: caption}}).then(successCallback);
        }


        function deleteBanner(id) {
            var url = base + id;
            return $http.delete(url)
                .then(successCallback);
        }

        function publishBanner(id, publish) {
            console.log('publishBanner', id, publish);
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