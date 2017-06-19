(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    /** @ngInject */
    function UserService(RequestService) {
        var base = 'userManagement';
        var permission = RequestService(base + '/permission/');
        var role = RequestService(base + '/role/');
        var user = RequestService(base + '/user/');
        var service = {
            assignPermissionToRole: assignPermissionToRole,
            assignPermissionToUser: assignPermissionToUser,
            changeEnabledUser: changeEnabledUser,
            changePassword: RequestService(base + '/changePassword').post,
            createRole: role.post,
            createUser: user.post,
            deletePermissionFromRole: deletePermissionFromRole,
            deletePermissionFromUser: deletePermissionFromUser,
            deleteRole: role.delete,
            deleteUser: user.delete,
            editCaptionOfPermission: editCaptionOfPermission,
            editCaptionOfRole: editCaptionOfRole,
            getAllPermissions: permission.get,
            getAllRoles: role.get,
            getCurrentUser: RequestService(base + '/me').get,
            getPermission: permission.getById,
            getRole: role.getById,
            getUser: user.getById,
            getUsersList: user.get,
            resetPassword: resetPassword,
            updateUser: updateUser,
            assignRoleToUser: assignRoleToUser,
            deleteRoleFromUser: deleteRoleFromUser
        };
        return service;

        ////////////////

        function assignPermissionToRole(role, params) {
            var url = base + '/role/' + role + '/assignPermission';
            return RequestService(url).post({}, params);
        }

        function assignPermissionToUser(username, params) {
            var url = base + '/user/' + username + '/assignPermission';
            return RequestService(url).post(null, params);
        }

        function deletePermissionFromRole(role, params) {
            var url = base + '/role/' + role + '/deletePermission';
            return RequestService(url).delete(null, params);
        }

        function deletePermissionFromUser(username, params) {
            var url = base + '/user/' + username + '/deletePermission';
            return RequestService(url).delete(null, params);
        }

        function editCaptionOfPermission(permissionId, params) {
            var url = base + '/permission/' + permissionId;
            return RequestService(url).put(null, null, params);
        }

        function editCaptionOfRole(role, params) {
            var url = base + '/role/' + role;
            return RequestService(url).put({}, params);
        }

        function changeEnabledUser(username, params) {
            var url = base + '/user/' + username + '/changeEnabled';
            return RequestService(url).put(null, {}, params);
        }

        function resetPassword(username, data) {
            var url = base + '/user/' + username + '/resetPassword';
            return RequestService(url).post(data);
        }

        function updateUser(username, data) {
            var url = base + '/user/' + username;
            return RequestService(url).put(null, data);
        }

        function assignRoleToUser(username, params) {
            var url = base + '/user/' + username + '/assignRole';
            return RequestService(url).post(null, params);
        }

        function deleteRoleFromUser(username, params) {
            var url = base + '/user/' + username + '/deleteRole';
            return RequestService(url).delete(null, params);
        }

    }

})();
