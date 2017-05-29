(function () {
    'use strict';

    angular
        .module('app')
        .controller('CreateUpdateApplicationController', CreateUpdateApplicationController);

    /** @ngInject */
    function CreateUpdateApplicationController($log, $q, $state, applicationService, categoryService, companyService, $scope,
                                               host, $stateParams, userService, toastr, $uibModal, util, $window) {
        var vm = this;
        vm.host = host;
        vm.croppedDataUrl = '';
        vm.cropper = {};
        vm.cropper.sourceImage = null;
        vm.cropper.croppedImage = null;
        vm.cropperWidth = $window.innerWidth * 0.4;
        vm.bounds = {
            left: 0,
            right: vm.cropperWidth * 0.5,
            top: vm.cropperWidth * 0.4,
            bottom: 0
        };
        vm.bannerBounds = {
            left: 0,
            right: 20,
            top: 20,
            bottom: 0
        };
        vm.resultImage = '';
        vm.title = 'CreateUpdateUserController';
        vm.method = $stateParams.method;
        vm.application = {
            id: $stateParams.id,
            seenCount: 0,
            newApp: false,
            specificApp: false,
            rating: 0
        };
        vm.file = {};
        vm.tmpData = 'nothing';
        vm.save = save;
        vm.reset = reset;
        vm.uploadLogo = uploadLogo;
        vm.uploadBanner = uploadBanner;
        vm.uploadPic = uploadPic;
        vm.deletePic = deletePic;
        vm.addFileModal = addFileModal;
        vm.deleteFile = deleteFile;

        activate();

        ////////////////

        $scope.$watch(angular.bind(this, function () {
            return this.cropper.croppedImage;
        }), function (newVal) {
            // console.log('cropper changed to ', newVal);
            if (document.getElementById('source-image')) {
                var w = document.getElementById('source-image').clientWidth;
                var h = document.getElementById('source-image').clientHeight;
                console.log(w, h);
            }

        });

        function activate() {
            $log.debug('Application module activated', $stateParams.id);
            vm.simorgh = $stateParams.id == 'simorgh';
            if (vm.simorgh) {
                $log.debug('This is is simorgh');
                if (vm.method == 'create') {
                    vm.application.appPackage = 'ir.simorghmarket.simorgh';
                    vm.application.id = null;
                }
            }
            $q.all(getCategories(), getCompanies(), getUsers()).then(getApplication)
        }

        function save() {
            switch (vm.method) {
                case 'create':
                    applicationService.createApplication(vm.application)
                        .then(function (data) {
                            util.toast('success', 'برنامه با موفقیت ایجاد شد. می‌توانید برای تکیمل آن، در همین صفحه نسبت به افزودن تصاویر و نسخه‌های آن اقدام نمایید.');
                            var id = vm.simorgh ? 'simorgh' : data.id;
                            $state.go('root.createUpdateApplication', {method: 'update', id: id});
                        }, function () {
                            util.toast('error', 'خطا در ایجاد برنامه جدید!');
                        });
                    break;
                case 'update':
                    applicationService.updateApplication(vm.application)
                        .then(function (data) {
                            util.toast('success', 'برنامه با موفقیت بروزرسانی شد.');
                            vm.name = data.name;
                        }, function () {
                            util.toast('error', 'خطا در بروزرسانی پروژه!');
                        });
            }
        }

        function reset() {
            switch (vm.method) {
                case 'create':
                    vm.application = {
                        seenCount: 0,
                        newApp: false,
                        specificApp: false,
                        rating: 0
                    };
                    break;
                case 'update':
                    getApplication();
            }
        }

        function getApplication() {
            if (vm.simorgh) {
                return applicationService.getSimurgh().then(
                    function (data) {
                        vm.application = data;
                        vm.name = data.name;
                    }, function (error) {
                        /*console.log('get simorgh');
                        vm.method = 'create';
                        vm.application = {
                            id: null,
                         seenCount: 0,
                         rating:0,
                            appPackage: "ir.simorghmarket.simorgh"
                         };*/
                        $state.go('root.createUpdateApplication', {method: 'create', id: 'simorgh'});
                    });
            } else if (vm.application.id) {
                return applicationService.getApplication(vm.application.id).then(function (data) {
                    vm.application = data;
                    vm.name = data.name;
                });
            }
        }

        function getCategories() {
            return categoryService.getAllCategories().then(function (data) {
                vm.categories = data;
            })
        }

        function getCompanies() {
            return companyService.getAllCompanies().then(function (data) {
                vm.companies = data;
            })
        }

        function getUsers() {
            return userService.getAllUsers().then(function (data) {
                vm.users = data;
            })
        }

        function uploadLogo(dataUrl) {
            applicationService.updateLogo(vm.application.id, dataUrl)
                .then(
                    function (response) {
                        vm.application.logo = response;
                        vm.appFile = null;
                        vm.tmpData = new Date();
                        util.toast('success', 'نشان با موفقیت به روزرسانی شد.');
                        vm.cropper = {};
                        vm.cropper.sourceImage = null;
                        vm.cropper.croppedImage = null;
                    },
                    function (response) {
                        if (response.status > 0) {
                            vm.errorMsg = response.status + ': ' + response.data;
                        }
                        util.toast('error', 'خطا در بارگذاری تصویر!');
                    },
                    function (evt) {
                        vm.progress = parseInt(100.0 * evt.loaded / evt.total);
                    });
        }

        function uploadBanner(dataUrl) {
            applicationService.updateBanner(vm.application.id, dataUrl)
                .then(
                    function (response) {
                        vm.application.banner = response;
                        vm.appFile = null;
                        vm.tmpData = new Date();
                        toastr.success('بنر با موفقیت به روزرسانی شد.');
                        vm.cropperBanner = {};
                        vm.cropperBanner.sourceImage = null;
                        vm.cropperBanner.croppedImage = null;
                    },
                    function (response) {
                        if (response.status > 0) {
                            vm.errorMsg = response.status + ': ' + response.data;
                        }
                        toastr.error('خطا در بارگذاری بنر!');
                    },
                    function (evt) {
                        vm.progress = parseInt(100.0 * evt.loaded / evt.total);
                    });
        }

        function uploadPic(dataUrl) {
            applicationService.addPic(vm.application.id, dataUrl, vm.picLabel)
                .then(
                    function (response) {
                        vm.application.pictures = response;
                        vm.picLabel = '';
                        toastr.success('تصویر با موفقیت اضافه شد.');
                        vm.picCropper = {};
                        vm.picCropper.sourceImage = null;
                        vm.picCropper.croppedImage = null;
                    },
                    function (response) {
                        if (response.status > 0) {
                            vm.errorMsg = response.status + ': ' + response.data;
                        }
                        toastr.error('خطا در بارگذاری تصویر!');
                    },
                    function (evt) {
                        vm.progress = parseInt(100.0 * evt.loaded / evt.total);
                    });
        }

        function deletePic(id) {
            applicationService.deletePic(vm.application.id, id)
                .then(
                    function (response) {
                        vm.application.pictures = response;
                        toastr.success('تصویر با موفقیت حذف شد.');
                        vm.picCropper = {};
                        vm.picCropper.sourceImage = null;
                        vm.picCropper.croppedImage = null;
                    },
                    function (response) {
                        if (response.status > 0) {
                            vm.errorMsg = response.status + ': ' + response.data;
                        }
                        toastr.error('خطا در حذف تصویر!');
                    },
                    function (evt) {
                        vm.progress = parseInt(100.0 * evt.loaded / evt.total);
                    });
        }

        function addFileModal(file) {
            file = file || {
                    description: '',
                    version: ''
                };
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/components/application/file/create-update-file.html',
                controller: CreateUpdateFileController,
                controllerAs: 'fmodal',
                size: 'lg',
                resolve: {
                    file: function () {
                        return file;
                    },
                    application: function () {
                        return vm.application;
                    }
                }
            });

            modalInstance.result.then(function () {
                applicationService.getFiles(vm.application.id).then(function (data) {
                    vm.application.files = data;
                })
            });
            function CreateUpdateFileController($log, $q, host, file, application, $timeout,
                                                $uibModalInstance, Upload, toastr) {
                var fmodal = this;
                fmodal.application = application;
                fmodal.file = file;
                fmodal.method = file.id ? 'PUT' : 'POST';
                var id = file.id || application.id;
                fmodal.uploadFile = uploadFile;
                fmodal.cancel = function () {
                    $uibModalInstance.dismiss();
                };
                function uploadFile(dataFile) {
                    console.log(dataFile);
                    fmodal.upload =
                        Upload.upload({
                            url: host + 'application/' + id + '/file',
                            method: fmodal.method,
                            data: {data: dataFile, description: fmodal.file.description, version: fmodal.file.version}
                        });

                    fmodal.upload.then(function (response) {
                        $timeout(function () {
                            console.log('file added');
                            $uibModalInstance.close();
                            fmodal.result = response.data;
                        });
                    }, function (response) {
                        if (response.status > 0)
                            fmodal.errorMsg = response.status + ': ' + response.data;
                    }, function (evt) {
                        // Math.min is to fix IE which reports 200% sometimes
                        fmodal.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    });
                }
            }
        }

        function deleteFile(id) {
            applicationService.deleteFile(vm.application.id, id)
                .then(function () {
                    toastr.success('فایل با موفقیت حذف شد.');
                    applicationService.getFiles(vm.application.id)
                        .then(function (data) {
                            vm.application.files = data;
                        })
                }, function () {
                    toastr.error('خطا در حذف فایل');
                })
        }

        $scope.$watch(angular.bind(this, function () {
            return this.picCropper;
        }), function (newVal, oldVal) {

            if(newVal) {
                if(!oldVal || newVal.sourceImage != oldVal.sourceImage){
                    console.log('Name changed to ',  newVal , ' from ' , oldVal);
                    vm.sourceImage = new Image;
                    vm.sourceImage.onload = function () {
                        console.log('loaded');
                    };
                    vm.sourceImage.scr = newVal.sourceImage;

                }

            }
        });
    }

})();