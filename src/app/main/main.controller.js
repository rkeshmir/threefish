(function () {
	'use strict';
	
	angular
		.module('app')
		.controller('MainController', MainController);
	
	/** @ngInject */
	function MainController($document, $translate, $timeout, $rootScope, $uibModal) {
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
				logoOut: "../../assets/images/icon/star-Start.jpg",
				logoAnimateIn: "../../assets/images/icon/star.gif",
				logoIn: "../../assets/images/icon/star-End.jpg",
				logoAnimateOut: "../../assets/images/icon/star-revers.gif",
				id: 1
			},
            {
                name: "محتوای شبکه‌ی اجتماعی",
                logoOut: "../../assets/images/icon/social-Start.jpg",
                logoAnimateIn: "../../assets/images/icon/Network.gif",
                logoIn: "../../assets/images/icon/social-End.jpg",
                logoAnimateOut: "../../assets/images/icon/Network-revers.gif",
                id: 2
            },
            {
                name: "برنامه‌‌سازی",
                awesomeIcon: "fa-product-hunt",
                id: 3
            },
			{
                name: "تیزر تبلیغاتی",
                awesomeIcon: "fa-gears",
                id: 4
            },
			{
                name: "مستند سازی",
                awesomeIcon: "fa-compass",
                id: 5
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
				$translate('APP.MESSAGES.WELCOME').then(function (msg) {
					// toastr.info(msg);
				}, function (msg) {
					// toastr.info(msg);
				});
			}

			$timeout(jQuerryFunctionalities, 1000);
			
		}


		var iconTimeOut = 900;

		function mouseIn(service) {
		    if( service.icon === 4)
		        return;
			console.log('mouse in', service.id);
			var src = service.logoAnimateIn;
            var $img = $('#icon-' + service.id + '-1');
            var timeout = 0; // no delay
            $timeout(function() {
                $img.attr('src', src);
            }, timeout);
            service.icon = 1;
            $timeout(function () {
                service.icon = 2;
            }, iconTimeOut);

		}

		function mouseOut(service) {
            if( service.icon === 4)
                return;
			console.log('mouse out', service.id);
            var src = service.logoAnimateOut;
            var $img = $('#icon-' + service.id + '-2');
            var timeout = 0; // no delay
            $timeout(function() {
                $img.attr('src', src);
            }, timeout);
            service.icon = 3;
            $timeout(function () {
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

            // Closes the sidebar menu
            $("#menu-close").click(function(e) {
                e.preventDefault();
                $("#sidebar-wrapper").toggleClass("active");
            });
// Opens the sidebar menu
            $("#menu-toggle").click(function(e) {
                e.preventDefault();
                $("#sidebar-wrapper").toggleClass("active");
            });
// Scrolls to the selected menu item on the page
            $(function() {
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
            $(document).scroll(function() {
                if ($(this).scrollTop() > 250) {
                    if (!fixed) {
                        fixed = true;
                        // $('#to-top').css({position:'fixed', display:'block'});
                        $('#to-top').show("slow", function() {
                            $('#to-top').css({
                                position: 'fixed',
                                display: 'block'
                            });
                        });
                    }
                } else {
                    if (fixed) {
                        fixed = false;
                        $('#to-top').hide("slow", function() {
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
            var onMapMouseleaveHandler = function(event) {
                var that = $(this);
                that.on('click', onMapClickHandler);
                that.off('mouseleave', onMapMouseleaveHandler);
                that.find('iframe').css("pointer-events", "none");
            };
            var onMapClickHandler = function(event) {
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
                if ($(".navbar").offset().top > 100) {
                    $(".navbar-fixed-top").addClass("top-nav-collapse");
                } else {
                    $(".navbar-fixed-top").removeClass("top-nav-collapse");
                }
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
                        return current || '';
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
