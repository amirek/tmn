(function () {
    'use strict';

    angular
        .module('app')
        .service('sessionService', sessionService);

    sessionService.$inject = ['$log', '$rootScope', '$localStorage'];

    function sessionService($log, $rootScope, $localStorage) {

        var service = {
            getUser: getUser,
            setUser: setUser,
            destroy: destroy
        };

        return service;

        function getUser() {
            return $localStorage.sessionUser;
        }

        function setUser(user) {
            $localStorage.sessionUser = user;
            $rootScope.$broadcast('user:changed');
        }

        /**
         * Destroy session
         */
        function destroy() {
            setUser(null);
        }
    }
})();
