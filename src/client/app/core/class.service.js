(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('classService', classService);

    classService.$inject = ['$http', '$q', 'baseUrl', 'exception', 'moment'];
    /* @ngInject */
    function classService($http, $q, baseUrl, exception, moment) {
        var service = {
            create: createClass,
            delete: deleteClass,
            getAll: getClasses,
            getForUser: getClassesByUser,
            update: updateClass,
            newInstance: newInstance
        };

        return service;

        function newInstance(studentId, tutorId) {
            var now = moment();
            return {
                'Subject': '',
                'StartTime': now.toDate(),
                'EndTime': moment(now).add(60, 'm').toDate(),
                'Student': studentId,
                'Tutor': tutorId
            };
        }

        function getClasses() {
            return $http.get(baseUrl + '/api/classes')
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for getClasses')(e);
            }
        }

        function getClassesByUser(user) {
            return getClasses().then(function (data) {
                return data.filter(function (c) {
                    if (user.IsTutor) {
                        return c.Tutor === user.Id;
                    } else {
                        return c.Student === user.Id;
                    }
                });
            });
        }

        function createClass(data) {
            return $http.post(baseUrl + '/api/Classes', data)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for createClass')(e);
            }
        }

        function deleteClass(id) {
            return $http.delete(baseUrl + '/api/Classes/' + id)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for deleteClass')(e);
            }
        }

        function updateClass(id, data) {
            return $http.put(baseUrl + '/api/Classes/' + id, data)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for updateClass')(e);
            }
        }
    }
})();
