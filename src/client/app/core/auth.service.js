(function () {
    'use strict';

    angular
        .module('app')
        .service('authService', authService);

    authService.$inject = ['$q', 'sessionService', 'userService'];

    function authService($q, sessionService, userService) {

        var service = {
            logIn: logIn,
            logOut: logOut,
            isLoggedIn: isLoggedIn,
            isStudent: isStudent,
            isTutor: isTutor
        };

        return service;

        /**
         * Check whether the user is logged in
         * @returns boolean
         */
        function isLoggedIn() {
            return sessionService.getUser() !== null;
        }

        /**
         * Check whether the user in session is a student
         * @returns boolean
         */
        function isStudent() {
            var user = sessionService.getUser();
            return user != null && user.IsTutor === false;
        }

        /**
         * Check whether the user in session is a tutor
         * @returns boolean
         */
        function isTutor() {
            var user = sessionService.getUser();
            return user != null && user.IsTutor === true;
        }

        /**
         * Log in
         *
         * @param {number} userId (but it's all fake anyway)
         * @returns {*|Promise}
         */
        function logIn(userId) {
            var deferred = $q.defer();
            deferred.resolve(userService.getAll().then(function (users) {
                return users.filter(function (user) {
                    return user.Id === userId;
                })[0];
            }));
            return deferred.promise
                .then(function (user) {
                    sessionService.setUser(user);
                });
        }

        /**
         * Log out
         *
         * @returns {*|Promise}
         */
        function logOut() {
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise
                .then(function () {
                    sessionService.destroy();
                });
        }
    }
})();
