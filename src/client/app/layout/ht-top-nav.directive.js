(function () {
    'use strict';

    angular
        .module('app.layout')
        .directive('htTopNav', htTopNav);

    htTopNav.$inject = ['userService', 'sessionService', 'authService'];

    /* @ngInject */
    function htTopNav(userService, sessionService, authService) {
        var directive = {
            bindToController: true,
            controller: TopNavController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
                'title': '='
            },
            templateUrl: 'app/layout/ht-top-nav.html'
        };

        /* @ngInject */
        function TopNavController() {
            var vm = this;

            vm.users = [];
            vm.impersonatedUser = sessionService.getUser();

            activate();

            vm.switchUser = function (user) {
                authService.logOut().then(authService.logIn(user.Id));
            };

            function activate() {
                userService.getAll().then(function (response) {
                    vm.users = response;
                }, function (reason) {
                    window.alert('Failed: ' + reason);
                });
            }
        }

        return directive;
    }
})();
