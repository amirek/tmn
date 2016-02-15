(function () {
    'use strict';

    angular
        .module('app.home')
        .factory('modalService', modalService);

    modalService.$inject = ['$uibModal'];
    /* @ngInject */
    function modalService($uibModal) {
        var service = {
            edit: showEdit,
            delete: showDelete,
            create: showCreate
        };

        return service;

        function showCreate(event, vm) {
            var instance = $uibModal.open({
                templateUrl: 'app/home/modalContentCreate.html',
                controller: 'ModalController',
                controllerAs: 'vm',
                resolve: {
                    event: function () {
                        return event;
                    }
                }
            });

            instance.result.then(function (createdEvent) {
                if (createdEvent !== undefined) {
                    vm.events.push(createdEvent);
                }
            });
        }

        function showDelete(event, vm) {
            var instance = $uibModal.open({
                templateUrl: 'app/home/modalContentDelete.html',
                controller: 'ModalController',
                controllerAs: 'vm',
                resolve: {
                    event: function () {
                        return event;
                    }
                }
            });

            instance.result.then(function (deletedItem) {
                if (deletedItem !== undefined) {
                    vm.events = vm.events.filter(function (el) {
                        return el.Id !== deletedItem.Id;
                    });
                }
            });
        }

        function showEdit(action, event) {
            return $uibModal.open({
                templateUrl: 'app/home/modalContentEdit.html',
                controller: 'ModalController',
                controllerAs: 'vm',
                resolve: {
                    event: function () {
                        return event;
                    }
                }
            });
        }
    }
})();
