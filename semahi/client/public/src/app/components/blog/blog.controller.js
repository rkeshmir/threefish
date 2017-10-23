(function () {
    'use strict';

    angular
        .module('app')
        .controller('BlogController', BlogController);

    /** @ngInject */
    function BlogController($document, $translate, $timeout, $rootScope, $uibModal, NgMap) {
        var firstLogin = $document[0].cookie.replace(
            /(?:(?:^|.*;\s*)firstLogin\s*\=\s*([^;]*).*$)|^.*$/, '$1'
        );
        var vm = this;
        vm.mouseIn = mouseIn;
        vm.mouseOut = mouseOut;
        vm.scroll = scroll;
        vm.toggleNav = toggleNav;
        vm.openServiceModal = openServiceModal;

        vm.services = [
            {
                name: "برندسازی",
                logoOut: "../../assets/images/icon/branding.png",
                logoAnimateIn: "../../assets/images/icon/branding.png",
                logoIn: "../../assets/images/icon/branding.png",
                logoAnimateOut: "../../assets/images/icon/branding.png",
                id: 1,
                description: "طبق تعریف انجمن بازاریابی آمریکا: مارک، برند یا نمانام، (به انگلیسی: Brand) یک نام، عبارت، طرح، نماد یا هر ویژگی دیگری است که مشخص‌کنندهٔ خدمات یا فروشندهٔ محصولی خاص باشد که به وسیلهٔ آن از دیگر محصولات و خدمات مشابه متمایز می‌گردد. عنوان قانونی برای برند، نشان تجاری است. برند مجموعه گره‌های ذهنی یا تداعیات کارکردی، احساسی، عقلی و مزیت‌هایی است که ذهن بازار هدف را اشغال نموده‌است. تداعی معانی پیوند دادن تصاویر و نشانه‌ها با برند یا مزایا و فواید یک برند است. این مزایا یا فواید برند است که مبنای تصمیم‌گیری برای خرید آن واقع خواهد شد. برند،  (به انگلیسی: Brand) همان چیزی است که مخاطب با دیدن، شنیدن، حس کردن و یا هرگونه ارتباطی با آن بصورت مفهومی، دیداری یا لفظی صفات و ویژگی‌های خود را در ذهن و قلب مخاطب تداعی می‌کند. برند شامل همه احساسات، ویژگی‌ها و مفاهیمی است که به یک نام گره خورده است؛ برند، برداشت افراد از یک نام است.",
                lead: "ویژگی و حس متفاوت کسب و کار شما",
                picture: "app/img/branding-banner.png"
            },
            {
                name: "محتوای شبکه‌ی اجتماعی",
                logoOut: "../../assets/images/icon/social-networking.png",
                logoAnimateIn: "../../assets/images/icon/social-networking.png",
                logoIn: "../../assets/images/icon/social-networking.png",
                logoAnimateOut: "../../assets/images/icon/social-networking.png",
                id: 2,
                description: "طبق تعریف انجمن بازاریابی آمریکا: مارک، برند یا نمانام، (به انگلیسی: Brand) یک نام، عبارت، طرح، نماد یا هر ویژگی دیگری است که مشخص‌کنندهٔ خدمات یا فروشندهٔ محصولی خاص باشد که به وسیلهٔ آن از دیگر محصولات و خدمات مشابه متمایز می‌گردد. عنوان قانونی برای برند، نشان تجاری است. برند مجموعه گره‌های ذهنی یا تداعیات کارکردی، احساسی، عقلی و مزیت‌هایی است که ذهن بازار هدف را اشغال نموده‌است. تداعی معانی پیوند دادن تصاویر و نشانه‌ها با برند یا مزایا و فواید یک برند است. این مزایا یا فواید برند است که مبنای تصمیم‌گیری برای خرید آن واقع خواهد شد. برند،  (به انگلیسی: Brand) همان چیزی است که مخاطب با دیدن، شنیدن، حس کردن و یا هرگونه ارتباطی با آن بصورت مفهومی، دیداری یا لفظی صفات و ویژگی‌های خود را در ذهن و قلب مخاطب تداعی می‌کند. برند شامل همه احساسات، ویژگی‌ها و مفاهیمی است که به یک نام گره خورده است؛ برند، برداشت افراد از یک نام است.",
                lead: "ویژگی و حس متفاوت کسب و کار شما",
                picture: "app/img/social-networking-banner.png"
            },
            {
                name: "برنامه‌‌سازی",
                logoOut: "../../assets/images/icon/programing.png",
                logoAnimateIn: "../../assets/images/icon/programing.png",
                logoIn: "../../assets/images/icon/programing.png",
                logoAnimateOut: "../../assets/images/icon/programing.png",
                id: 3,
                description: "طبق تعریف انجمن بازاریابی آمریکا: مارک، برند یا نمانام، (به انگلیسی: Brand) یک نام، عبارت، طرح، نماد یا هر ویژگی دیگری است که مشخص‌کنندهٔ خدمات یا فروشندهٔ محصولی خاص باشد که به وسیلهٔ آن از دیگر محصولات و خدمات مشابه متمایز می‌گردد. عنوان قانونی برای برند، نشان تجاری است. برند مجموعه گره‌های ذهنی یا تداعیات کارکردی، احساسی، عقلی و مزیت‌هایی است که ذهن بازار هدف را اشغال نموده‌است. تداعی معانی پیوند دادن تصاویر و نشانه‌ها با برند یا مزایا و فواید یک برند است. این مزایا یا فواید برند است که مبنای تصمیم‌گیری برای خرید آن واقع خواهد شد. برند،  (به انگلیسی: Brand) همان چیزی است که مخاطب با دیدن، شنیدن، حس کردن و یا هرگونه ارتباطی با آن بصورت مفهومی، دیداری یا لفظی صفات و ویژگی‌های خود را در ذهن و قلب مخاطب تداعی می‌کند. برند شامل همه احساسات، ویژگی‌ها و مفاهیمی است که به یک نام گره خورده است؛ برند، برداشت افراد از یک نام است.",
                lead: "ویژگی و حس متفاوت کسب و کار شما",
                picture: "app/img/programing-banner.png"
            },
            {
                name: "تیزر تبلیغاتی",
                logoOut: "../../assets/images/icon/teaser.png",
                logoAnimateIn: "../../assets/images/icon/teaser.png",
                logoIn: "../../assets/images/icon/teaser.png",
                logoAnimateOut: "../../assets/images/icon/teaser.png",
                id: 4,
                description: "طبق تعریف انجمن بازاریابی آمریکا: مارک، برند یا نمانام، (به انگلیسی: Brand) یک نام، عبارت، طرح، نماد یا هر ویژگی دیگری است که مشخص‌کنندهٔ خدمات یا فروشندهٔ محصولی خاص باشد که به وسیلهٔ آن از دیگر محصولات و خدمات مشابه متمایز می‌گردد. عنوان قانونی برای برند، نشان تجاری است. برند مجموعه گره‌های ذهنی یا تداعیات کارکردی، احساسی، عقلی و مزیت‌هایی است که ذهن بازار هدف را اشغال نموده‌است. تداعی معانی پیوند دادن تصاویر و نشانه‌ها با برند یا مزایا و فواید یک برند است. این مزایا یا فواید برند است که مبنای تصمیم‌گیری برای خرید آن واقع خواهد شد. برند،  (به انگلیسی: Brand) همان چیزی است که مخاطب با دیدن، شنیدن، حس کردن و یا هرگونه ارتباطی با آن بصورت مفهومی، دیداری یا لفظی صفات و ویژگی‌های خود را در ذهن و قلب مخاطب تداعی می‌کند. برند شامل همه احساسات، ویژگی‌ها و مفاهیمی است که به یک نام گره خورده است؛ برند، برداشت افراد از یک نام است.",
                lead: "ویژگی و حس متفاوت کسب و کار شما",
                picture: "app/img/teaser-banner.png"
            },
            {
                name: "مستند سازی",
                logoOut: "../../assets/images/icon/documenting.png",
                logoAnimateIn: "../../assets/images/icon/documenting.png",
                logoIn: "../../assets/images/icon/documenting.png",
                logoAnimateOut: "../../assets/images/icon/documenting.png",
                id: 5,
                description: "طبق تعریف انجمن بازاریابی آمریکا: مارک، برند یا نمانام، (به انگلیسی: Brand) یک نام، عبارت، طرح، نماد یا هر ویژگی دیگری است که مشخص‌کنندهٔ خدمات یا فروشندهٔ محصولی خاص باشد که به وسیلهٔ آن از دیگر محصولات و خدمات مشابه متمایز می‌گردد. عنوان قانونی برای برند، نشان تجاری است. برند مجموعه گره‌های ذهنی یا تداعیات کارکردی، احساسی، عقلی و مزیت‌هایی است که ذهن بازار هدف را اشغال نموده‌است. تداعی معانی پیوند دادن تصاویر و نشانه‌ها با برند یا مزایا و فواید یک برند است. این مزایا یا فواید برند است که مبنای تصمیم‌گیری برای خرید آن واقع خواهد شد. برند،  (به انگلیسی: Brand) همان چیزی است که مخاطب با دیدن، شنیدن، حس کردن و یا هرگونه ارتباطی با آن بصورت مفهومی، دیداری یا لفظی صفات و ویژگی‌های خود را در ذهن و قلب مخاطب تداعی می‌کند. برند شامل همه احساسات، ویژگی‌ها و مفاهیمی است که به یک نام گره خورده است؛ برند، برداشت افراد از یک نام است.",
                lead: "ویژگی و حس متفاوت کسب و کار شما",
                picture: "app/img/documenting-banner.png"
            }
        ];
        vm.blogs = [
            {
                title: "همکاری با اقامت۲۴",
                date: "16 آبان 1396",
                lead: "                    این مرکز با هدف تحقق شعار «رزرو مکان اقامتی قبل از سفر» که از دغدغه های سازمان میراث فرهنگی و گردشگری بوده است، طراحی و راه اندازی شد.",
                image: "img/blog/700-400-2.jpg"
            },
            {
                title: "عنوان پست",
                date: "16 آبان 1396",
                lead: "خلاصه‌ی پست در دو یا نهایتاً سه خط به طوری که زیاد طولانی نباشد. می‌توان در انتهای مطلب لینک به ادامه‌ی مطلب قرار داد یا با کلیک بر روی تصویر به ادامه‌ی مطلب رفت",
                image: "img/~text.png"
            },
            {
                title: "عنوان پست",
                date: "16 آبان 1396",
                lead: "                    خلاصه‌ی پست در دو یا نهایتاً سه خط به طوری که زیاد طولانی نباشد. می‌توان در انتهای مطلب لینک به ادامه‌ی مطلب قرار داد یا با کلیک بر روی تصویر به ادامه‌ی مطلب رفت",
                image: "img/blog/460072-love-ballons.jpg"
            }
        ];
        vm.tel = '+982188776655';

        vm.services.forEach(function (service) {
            service.icon = service.awesomeIcon ? 4 : 0;
        });

        activate();

        function activate() {
            if (!firstLogin) {
                $document[0].cookie = 'firstLogin=true';
            }
            $timeout(jQuerryFunctionalities, 1000);

            vm.services.forEach(function (service) {
                mouseIn(service);
                $timeout(function () {
                    mouseOut(service);
                }, 1000);
            })

            NgMap.getMap("map", {timeout: 20000}).then(function () {
                vm.loadMap = true;
            })

        }


        var iconTimeOut = 900;

        function mouseIn(service) {
            if (service.icon === 4)
                return;
            console.log('mouse in', service.id);
            var src = service.logoAnimateIn;
            var $img = $('#icon-' + service.id + '-1');
            var timeout = 0; // no delay
            $timeout(function () {
                $img.attr('src', src);
            }, timeout);
            service.icon = 1;
            $timeout(function () {
                if (service.icon === 1)
                    service.icon = 2;
            }, iconTimeOut);

        }

        function mouseOut(service) {
            if (service.icon === 4)
                return;
            console.log('mouse out', service.id);
            var src = service.logoAnimateOut;
            var $img = $('#icon-' + service.id + '-2');
            var timeout = 0; // no delay
            $timeout(function () {
                $img.attr('src', src);
            }, timeout);
            service.icon = 3;
            $timeout(function () {
                if (service.icon === 3)
                    service.icon = 0;
            }, iconTimeOut);
        }

        function scroll(elementId) {
            var offset = 30; //pixels; adjust for floating menu, context etc
            var duration = 2000; //milliseconds
            $rootScope.showNav = false;
            var someElement = angular.element(document.getElementById(elementId));
            $document.scrollToElement(someElement, offset, duration);
        }

        function jQuerryFunctionalities() {
            $(".navbar-fixed-top").addClass("top-nav-collapse"); //added by alan

            // Closes the sidebar menu
            $("#menu-close").click(function (e) {
                e.preventDefault();
                $("#sidebar-wrapper").toggleClass("active");
            });
// Opens the sidebar menu
            $("#menu-toggle").click(function (e) {
                e.preventDefault();
                $("#sidebar-wrapper").toggleClass("active");
            });
// Scrolls to the selected menu item on the page
            $(function () {
                $('a[href*=\\#]:not([href=\\#],[data-toggle],[data-target],[data-slide])').click(function () {
                    $('#menu-items').removeClass('open');
                    $('.navbar-collapse.collapse').removeClass('in');
                    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                        || location.hostname == this.hostname) {
                        var target = $(this.hash);
                        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                        console.log('target', target);
                        if (target.length) {
                            $('html,body').animate({
                                scrollTop: target.offset().top
                            }, 1000);
                            return false;
                        }
                    }
                });
            });
//#to-top button appears after scrolling
            var fixed = false;
            $(document).scroll(function () {
                if ($(this).scrollTop() > 250) {
                    if (!fixed) {
                        fixed = true;
                        // $('#to-top').css({position:'fixed', display:'block'});
                        $('#to-top').show("slow", function () {
                            $('#to-top').css({
                                position: 'fixed',
                                display: 'block'
                            });
                        });
                    }
                } else {
                    if (fixed) {
                        fixed = false;
                        $('#to-top').hide("slow", function () {
                            $('#to-top').css({
                                display: 'none'
                            });
                        });
                    }
                }
            });
// Disable Google Maps scrolling
// See http://stackoverflow.com/a/25904582/1607849
// Disable scroll zooming and bind back the click event
            var onMapMouseleaveHandler = function (event) {
                var that = $(this);
                that.on('click', onMapClickHandler);
                that.off('mouseleave', onMapMouseleaveHandler);
                that.find('iframe').css("pointer-events", "none");
            };
            var onMapClickHandler = function (event) {
                var that = $(this);
                // Disable the click handler until the user leaves the map area
                that.off('click', onMapClickHandler);
                // Enable scrolling zoom
                that.find('iframe').css("pointer-events", "auto");
                // Handle the mouse leave event
                that.on('mouseleave', onMapMouseleaveHandler);
            };
// Enable map zooming with mouse scroll when the user clicks the map
            $('.map').on('click', onMapClickHandler);


            // jQuery to collapse the navbar on scroll
            function collapseNavbar() {
                $(".navbar-fixed-top").addClass("top-nav-collapse"); //added by alan

            }

            $(window).scroll(collapseNavbar);
            $(document).ready(collapseNavbar);

        }

        function toggleNav() {
            console.log('toggleNav', $rootScope.showNav);
            $rootScope.showNav = !$rootScope.showNav;
        }

        function openServiceModal(current) {

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/main/services-modal/services.html',
                controller: 'ServicesVm',
                controllerAs: 'ServicesVm',
                size: 'lg',
                resolve: {
                    services: function () {
                        return vm.services;
                    },
                    current: function () {
                        return current || 0;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        }
    }
})();
/**
 * Created by alan on 10/21/2017.
 */
