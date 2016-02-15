(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('transformationService', transformationService);

    transformationService.$inject = ['$http', '$q', 'exception', 'moment', 'logger'];
    /* @ngInject */
    function transformationService($http, $q, exception, moment, logger) {
        var service = {
            c2e: transformClassesToEvents,
            e2c: transformEventsToClasses
            //updateBackingClass: updateBackingClass
        };

        return service;

        function transformClassesToEvents(data) {
            if (angular.isArray(data)) {
                var events = [];
                angular.forEach(data, function (classObject) {
                    events.push(transformClassToEvent(classObject));
                });
                return events;
            } else {
                return transformClassToEvent(data);
            }
        }

        function transformEventsToClasses(data) {
            if (angular.isArray(data)) {
                var events = [];
                angular.forEach(data, function (classObject) {
                    events.push(transformEventToClass(classObject));
                });
                return events;
            } else {
                return transformEventToClass(data);
            }
        }

        function transformClassToEvent(classObject) {
            angular.extend(classObject, {
                title: classObject.Subject,
                startsAt: stringToDate(classObject.StartTime),
                endsAt: stringToDate(classObject.EndTime),
                draggable: false,               // TODO: implement
                resizable: false,               // TODO: implement
                editable: true,
                deletable: true
            });
            return classObject;
        }

        function transformEventToClass(event) {
            var obj = angular.copy(event);
            obj.StartTime = dateToString(event.startsAt);
            obj.EndTime = dateToString(event.endsAt);
            obj.Subject = event.title;
            delete obj.deletable;
            delete obj.draggable;
            delete obj.editable;
            delete obj.resizable;
            delete obj.startsAt;
            delete obj.endsAt;
            delete obj.title;
            return obj;
        }

        function stringToDate(string) {
            if (!moment(string).isValid()) {
                return null;
            }
            return moment(string).toDate();
        }

        function dateToString(date) {
            if (!moment(date).isValid()) {
                return null;
            }
            return moment(date).toISOString();
        }
    }
})();
