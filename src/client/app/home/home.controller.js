(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController)
        .controller('ModalController', ModalController);

    HomeController.$inject = ['$q', '$scope', '$rootScope', 'classService',
        'transformationService', 'sessionService', 'modalService', 'logger'];
    /* @ngInject */
    function HomeController($q, $scope, $rootScope, classService,
                            transformationService, sessionService, modalService, logger) {
        var vm = this;
        //vm.users = [];
        vm.currentUser = {};
        vm.calendarView = 'month';
        vm.viewDate = new Date();
        vm.events = [];

        vm.isCellOpen = false;

        vm.eventClicked = editBooking;
        vm.eventEdited = editBooking;
        vm.bookNew = newBooking;

        vm.eventDeleted = function (event) {
            modalService.delete(event, vm);
        };

        vm.toggle = function ($event, field, event) {
            $event.preventDefault();
            $event.stopPropagation();
            event[field] = !event[field];
        };

        $rootScope.$on('user:changed', updateCurrentUser);
        updateCurrentUser();

        function editBooking(event) {
            modalService.edit('Edited', event);
        }

        function newBooking(event) {
            modalService.create(event, vm);
        }

        function getClasses(forUser) {
            return classService.getForUser(forUser).then(function (data) {
                vm.events = transformationService.c2e(data);
                return vm.events;
            });
        }

        function updateCurrentUser() {
            vm.currentUser = sessionService.getUser();
        }

        $scope.$watch('vm.currentUser', function (newValue) {
            if (newValue !== undefined && newValue != null) {
                getClasses(newValue);
            }
        }, false);
    }

    ModalController.$inject = ['userService', 'classService', 'transformationService', '$scope',
        '$uibModalInstance', 'event', 'moment', 'sessionService', 'logger'];

    function ModalController(userService, classService, transformationService, $scope,
                             $uibModalInstance, event, moment, sessionService, logger) {
        var vm = this;
        vm.originalEvent = event;
        vm.event = angular.copy(event);
        vm.startsAtOpen = false;
        vm.userObject = {};
        vm.users = [];
        vm.currentUser = sessionService.getUser();
        var asTutor = vm.currentUser.IsTutor;

        if (vm.event === undefined) {
            var currentUserId = vm.currentUser.Id;
            var newClass = classService.newInstance(
                asTutor ? undefined : currentUserId,
                asTutor ? currentUserId : undefined
            );
            vm.event = transformationService.c2e(newClass);
        }
        vm.duration = Math.abs(vm.event.startsAt - vm.event.endsAt) / 60000;
        vm.durationStep = 15;

        if (asTutor) {
            vm.userTitle = 'Student';
            if (event !== undefined) {
                getUser(event.Student);
            } else {
                getStudentsList();
            }
        } else {
            vm.userTitle = 'Tutor';
            if (event !== undefined) {
                getUser(event.Tutor);
            } else {
                getTutorsList();
            }
        }

        function getStudentsList(id) {
            return userService.getStudents().then(function (data) {
                vm.users = data;
                return vm.users;
            });
        }

        function getTutorsList(id) {
            return userService.getTutors().then(function (data) {
                vm.users = data;
                return vm.users;
            });
        }

        function getUser(id) {
            return userService.getById(id).then(function (data) {
                vm.userObject = data;
                return vm.userObject;
            });
        }

        vm.openCalendar = function (e) {
            vm.startsAtOpen = true;
        };

        vm.dateOptions = {
            showWeeks: false,
            startingDay: 1
        };

        vm.timeOptions = {
            readonlyInput: false,
            showMeridian: false
        };

        $scope.update = function () {
            vm.originalEvent.startsAt = vm.event.startsAt;
            vm.originalEvent.endsAt = vm.event.endsAt;
            var classObject = transformationService.e2c(vm.event);
            classService.update(classObject.Id, classObject).then(function (response) {
                //OK
                vm.originalEvent = transformationService.c2e(response);
                logger.success('Booking updated!');
                $uibModalInstance.close(vm.originalEvent);
            }, function (response) {
                //NOK
                logger.error('Update failed!');
                console.log(response);
            });
        };

        $scope.create = function () {
            var classObject = transformationService.e2c(vm.event);
            if (asTutor) {
                classObject.Student = vm.userObject.Id;
            } else {
                classObject.Tutor = vm.userObject.Id;
            }
            classService.create(classObject).then(function (response) {
                //OK
                vm.event = transformationService.c2e(response);
                var created = vm.event;
                logger.success('Booking updated!');
                $uibModalInstance.close(vm.event);
            }, function (response) {
                //NOK
                logger.error('Update failed!');
                console.log(response);
            });
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.delete = function () {
            classService.delete(vm.event.Id).then(function (response) {
                //OK
                vm.originalEvent = undefined;
                logger.success('Booking deleted!');
                $uibModalInstance.close(vm.originalEvent);
            }, function (response) {
                //NOK
                logger.error('Delete failed!');
                console.log(response);
            });
        };

        $scope.$watch('vm.duration', function (newValue) {
            if (newValue !== undefined && newValue != null && angular.isNumber(newValue)) {
                vm.event.endsAt = moment(vm.event.startsAt.getTime() + 100000 * newValue).toDate();
            }
        }, false);

        $scope.$watch('vm.event.startsAt', function (newValue) {
            if (newValue !== undefined && newValue != null && angular.isDate(newValue)) {
                vm.event.endsAt = moment(newValue.getTime() + 100000 * vm.duration).toDate();
            }
        }, false);
    }

})();
