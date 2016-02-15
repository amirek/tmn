(function () {
    'use strict';

    angular
        .module('app.home')
        .run(appRun);

    appRun.$inject = ['$rootScope', 'authService', 'sessionService', 'routerHelper'];
    /* @ngInject */
    function appRun($rootScope, authService, sessionService, routerHelper) {
        $rootScope.authService = authService;
        $rootScope.sessionService = sessionService;
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'home',
                config: {
                    url: '/',
                    templateUrl: 'app/home/home.html',
                    controller: 'HomeController',
                    controllerAs: 'vm',
                    title: 'home',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-home"></i> Home'
                    }
                }
            }
        ];
    }
})();
