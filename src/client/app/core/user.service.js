(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('userService', userService);

    userService.$inject = ['$http', '$q', 'baseUrl', 'exception', 'logger'];
    /* @ngInject */
    function userService($http, $q, baseUrl, exception, logger) {
        var service = {
            getAll: getAll,
            getById: getById,
            getStudents: getStudents,
            getTutors: getTutors
        };

        return service;

        function getAll() {
            return $http.get(baseUrl + '/api/users')
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for getAll')(e);
            }
        }

        function getById(id) {
            return $http.get(baseUrl + '/api/users/' + id)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for getAll')(e);
            }
        }

        function getTutors() {
            return getAll().then(function (data) {
                return data.filter(function (user) {
                    return user.IsTutor;
                });
            });
        }

        function getStudents() {
            return getAll().then(function (data) {
                return data.filter(function (user) {
                    return !user.IsTutor;
                });
            });
        }
    }
})();
