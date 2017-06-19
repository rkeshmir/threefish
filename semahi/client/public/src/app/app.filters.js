(function () {
	'use strict';
	
	angular
		.module('app')
		.filter('eNumber', eNumber)
		.filter('deviceType', deviceType)
		.filter('fileLogAction', fileLogAction)
		.filter('incomeDate', incomeDate)
		.filter('jDate', jDate)
		.filter('pCurrency', pCurrency)
		.filter('pNumber', pNumber)
		.filter('sDate', sDate)
		.filter('trueFalse', trueFalse)
		.filter('trustedHtml', trustedHtml)
		.filter('trustedUrl', trustedUrl)
	;
	
	/** @ngInject */
	function eNumber() {
		return eNumberFilter;
		
		////////////////
		
		function eNumberFilter(value) {
			if (angular.isDefined(value) && value !== null && value.toString().trim() !== '') {
				var persianNumbers = ['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۰'];
				var englishNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
				for (var i = 0, numbersLen = persianNumbers.length; i < numbersLen; i += 1) {
					value = value.toString().replace(new RegExp(persianNumbers[i], 'g'), englishNumbers[i]);
				}
			}
			return value;
		}
	}
	
	function deviceType() {
		return deviceTypeFilter;
		
		////////////////
		
		function deviceTypeFilter(type) {
			return type === 1 ? 'ATM' : 'UPS';
		}
	}
	
	function fileLogAction() {
		return fileLogActionFilter;
		
		////////////////
		
		function fileLogActionFilter(type) {
			return type === 1 ? 'APP.ACTIONS.DELETE' : 'APP.ACTIONS.UPLOAD';
		}
	}
	
	/** @ngInject */
	function incomeDate(moment) {
		return incomeDateFilter;
		
		////////////////
		
		function incomeDateFilter(date) {
			if (angular.isUndefined(date) || date === null) {
				return 'نامشخص ';
			}
			return moment(date).format('jMMMM  jYY').replace('امرداد', 'مرداد');
		}
	}
	
	/** @ngInject */
	function jDate(moment) {
		return jDateFilter;
		
		////////////////
		
		function jDateFilter(date) {
			if (angular.isUndefined(date) || date === null) {
				return 'نامشخص ';
			}
			return moment(date).format('jD jMMMM  jYY ').replace('امرداد', 'مرداد');
		}
	}
	
	function pCurrency() {
		return pCurrencyFilter;
		
		////////////////
		
		function pCurrencyFilter(number) {
			if (number === null || angular.isUndefined(number)) {
				return '';
			}
            if (number === 0) {
                return 'رایگان';
            }
			var parts = number.toString().split('.');
			parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			return parts.join('.');
		}
	}
	
	function pNumber() {
		return pNumberFilter;
		
		////////////////
		
		function pNumberFilter(value) {
			if (angular.isDefined(value) && value !== null && value.toString().trim() !== '') {
				var persianNumbers = ['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۰'];
				var englishNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
				for (var i = 0, numbersLen = englishNumbers.length; i < numbersLen; i += 1) {
					value = value.toString().replace(new RegExp(englishNumbers[i], 'g'), persianNumbers[i]);
				}
				return value;
			}
			else {
				return '';
			}
		}
	}
	
	/** @ngInject */
	function sDate(moment) {
		return sDateFilter;
		
		////////////////
		
		function sDateFilter(date) {
			return date ? moment(date, 'jYYYY-jMM-jDD').format('YYYY-MM-DD') : null;
		}
	}
	
	function trueFalse() {
		return trueFalseFilter;
		
		////////////////
		
		function trueFalseFilter(flag) {
			return flag ? 'APP.SHARE.TRUE' : 'APP.SHARE.FALSE';
		}
	}
	
	/** @ngInject */
	function trustedHtml($sce) {
		return trustedHtmlFilter;
		
		////////////////
		
		function trustedHtmlFilter(url) {
			return $sce.trustAsHtml(url);
		}
	}
	
	/** @ngInject */
	function trustedUrl($sce) {
		return trustedUrlFilter;
		
		////////////////
		
		function trustedUrlFilter(url) {
			return $sce.trustAsResourceUrl(url);
		}
	}
	
})();
