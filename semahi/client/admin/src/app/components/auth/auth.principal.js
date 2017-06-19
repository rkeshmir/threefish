(function () {
	'use strict';
	
	/**
	 * @ngdoc service
	 * @name auth.factory:principal
	 * @description
	 * # principal
	 */
	angular
		.module('auth')
		.factory('principal', principal);
	
	/** @ngInject */
	function principal($q, $http, $log, $state, $rootScope, host) {
		var _identity;
		var identityDeffered;
		
		return {
			authorize: authorize,
			hasRole: hasRole,
			hasRoles: hasRoles,
			identity: identity,
			getIdentity: getIdentity,
			logout: logout
		};
		
		function authorize() {
            console.log('principal.authorize', $state.data);
			return identity().then(
				function () {
					if ($state.data &&
						$state.data.roles &&
						$state.data.roles.length > 0
						&& !hasRoles($state.data.roles)) {
                        console.log('\tIn if')
						if (_identity) {
                            console.log('user is signed in but not authorized for desired state');
							// user is signed in but not authorized for desired state
							$state.go('unauthorized');
						}
						else {
                            console.log('user is not authenticated!');
                            // user is not authenticated, go to unauthorized page
							$rootScope.returnToState = $rootScope.toState;
							$rootScope.returnToStateParams = $rootScope.toParams;
                            $state.go('unauthorized');
						}
					}
				},
				function () {
                    console.log('user not authorized, going to login');
					$state.go('login');
				});
		}
		
		function hasRole(role) {
			if (!_identity.authorities) {
				$log.info('hasRole : !_identity.authorities');
				$log.info(_identity);
				return false;
			}
			for (var i = 0; i < _identity.authorities.length; i += 1) {
				if (_identity.authorities[i].authority === role) {
					return true;
				}
			}
			return false;
		}
		
		function hasRoles(roles) {
			// $log.info('hasRoles:' , roles);
			if (!_identity.authorities) {
				// $log.info('hasRoles: !_identity.authorities');
				// $log.info(_identity);
				return false;
			}
			for (var i = 0; i < roles.length; i += 1) {
				if (hasRole(roles[i])) {
					return true;
				}
			}
			// $log.info('hasRoles: Role note found');
			return false;
		}
		
		function identity(force) {
			$log.info('identity function');

			if (force === true) {
				$log.info('_identity set to undefined');
				_identity = undefined;
                identityDeffered = undefined;
			}
            if (identityDeffered) {
                return identityDeffered.promise;
            }

            identityDeffered = $q.defer();
			
			// check and see if we have retrieved the identity data from the server.
			// if we have, reuse it by immediately resolving
			if (angular.isDefined(_identity)) {
				identityDeffered.resolve(_identity);
                $log.info('\t_identity is resolved');
				return identityDeffered.promise;
			}
			
			// otherwise, retrieve the identity data from the server,
			// update the identity object, and then resolve.
			// var url = host.url() + host.api + 'user/me';
			var url = host + 'user/me';
			$http.get(url, {'withCredentials': true})
                .then(function (response) {
                    if (response.status === 200) {
						$log.info('identity resolved');
                        _identity = response.data;
						identityDeffered.resolve(_identity);
                        $rootScope.currentUser = _identity;
					} else {
                        $log.info('identity resolved by strange status', response.status);
                        identityDeffered.reject(response.data);
                        identityDeffered = undefined;
					}
                }, function (error) {
                    $log.info('identity rejected');
                    identityDeffered.reject(error);
                    identityDeffered = undefined;
                });
			
			return identityDeffered.promise;
		}
		
		function getIdentity() {
			return _identity;
		}
		
		function logout() {
			var url = host + 'logout';
			$http.get(url, {'withCredentials': true})
                .then(function (data, status) {
					if (status === 200) {
						_identity = undefined;
                        identityDeffered = undefined;
                        $state.go('login');
                    } else {
						$state.go('login');
						
					}
                }, function () {
                    console.log('unsuccessful logout')
                });
			
		}
	}
})();
