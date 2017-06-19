(function () {
    'use strict';

    angular
        .module('app')
        .controller('ApplicationController', ApplicationController);

    /** @ngInject */
    function ApplicationController($log, $q, NgTableParams, applicationService, toastr, categoryService,
                                   companyService, userService, host) {
        var vm = this;
        vm.title = 'ApplicationController';
        vm.host = host;
        vm.delete = Delete;
        activate();

        ////////////////

        function activate() {
            $log.debug('Application module activated');
            $q.all([getCategories(), getCompanies(), getUsers()]).then(function (data) {
                vm.categories = data[0];
                vm.companies = data[1];
                vm.users = data[2];

                vm.categories.forEach(function (category) {
                    category.title = category.name;
                });
                vm.categories.push({title: 'انتخاب و جستجو بر اساس دسته‌بندی...'});
                vm.companies.forEach(function (company) {
                    company.title = company.name;
                });
                vm.companies.push({title: 'انتخاب و جستجو بر اساس شرکت...'});
                vm.users.forEach(function (user) {
                    user.title = user.completeName;
                    user.id = user.username;
                });
                vm.users.push({title: 'انتخاب و جستجو بر اساس کاربر...'});

                console.log('vm.categories', vm.categories);
                vm.applicationTable = new NgTableParams({
                    page: 1,
                    count: 20
                }, {
                    getData: getApplications
                });
            });

        }

        function getApplications(tabelparams) {
            console.log(tabelparams.filter());
            var params = {
                page: tabelparams.page() - 1,
                size: tabelparams.count()
            };
            if(tabelparams.filter().name)
                params.name = tabelparams.filter().name;
            if(tabelparams.filter().appPackage)
                params.appPackage = tabelparams.filter().appPackage;
            if(tabelparams.filter().fee)
                params.fee = tabelparams.filter().fee;
            if(tabelparams.filter().category)
                params.categoryId = tabelparams.filter().category;
            if(tabelparams.filter().company)
                params.companyId = tabelparams.filter().company;
            if(tabelparams.filter().user)
                params.username = tabelparams.filter().user;

            return applicationService.getApplications(params).then(function (data) {
                data.content.forEach(function (app) {
                    app.user = vm.users.filter(function (user) {
                        return user.username === app.userId;
                    })[0];
                    app.company = vm.companies.filter(function (company) {
                        return company.id === app.companyId;
                    })[0];

                });
                tabelparams.total(data.totalElements);
                return data.content;
            });
        }

        function Delete(id) {
            applicationService.deleteApplication(id).then(function () {
                vm.applicationTable.reload();
                toastr.success('برنامه با موفقیت حذف شد.');
            }, function () {
                toastr.error('خطا در حذف برنامه!');
            })
        }

        function getCategories() {
            return categoryService.getAllCategories();
        }

        function getCompanies() {
            return companyService.getAllCompanies();
        }

        function getUsers() {
            return userService.getAllUsers();
        }


    }

})();