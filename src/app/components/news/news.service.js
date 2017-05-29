(function () {
    'use strict';

    angular
        .module('app')
        .factory('newsService', newsService);

    /** @ngInject */
    function newsService($log, $http, host, Upload) {
        var base = host + 'news/';
        var service = {
            getNewsList: getNewsList,
            getAllNewsList: getAllNewsList,
            getNews: getNews,
            createNews: createNews,
            mainPicture: mainPicture,
            updateNews: updateNews,
            deleteNews: deleteNews
        };
        return service;

        function successCallback(response) {
            return response.data;
        }

        ////////////////

        function createNews(news) {
            return $http.post(base, news);
        }

        function mainPicture(id, dataUrl) {
            var url = base + id + '/mainPicture';
            return Upload.upload({
                url: url,
                data: {
                    pic: Upload.dataUrltoBlob(dataUrl, 'image.png')
                },
                method: 'POST'
            }).then(successCallback);
        }


        function getNewsList(params) {
            return $http.get(base, {params: params})
                .then(successCallback);
        }

        function getAllNewsList() {
            var url = base + 'all';
            return $http.get(url)
                .then(successCallback);
        }

        function getNews(id) {
            var url = base + id;
            var params = {
                manage: true
            };
            return $http.get(url, {params: params})
                .then(successCallback);
        }


        function updateNews(news) {
            var url = base + news.id;
            return $http.put(url, news).then(successCallback);
        }


        function deleteNews(id) {
            var url = base + id;
            return $http.delete(url)
                .then(successCallback);
        }


    }

})();